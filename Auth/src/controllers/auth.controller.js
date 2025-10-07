const userModel = require('../models/user.model');
const redis = require('../db/redis');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

async function registerUser(req, res){ 
    const {username, email, password, fullname: { firstname, lastname}, role } = req.body;

    const isUserAlereadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(isUserAlereadyExists){
        return res.status(400).json({
            message:"User with this username or email already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        fullname:{
            firstname,
            lastname
        },
        role: role || 'user'
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
        },
        role: user.role,
        address: user.addresses
    })
}

async function loginUser(req, res){

    const { username, email, password}  = req.body;

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select('+password');

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
        },
        role: user.role,
        address: user.addresses
    })
}

async function getCurrentUser(req, res){
    return res.status(200).json({
        message: "Current user fetched successfully",
        user: req.user
    });
}

async function logoutUser(req, res) {
    const token = req.cookies.token;

    if (token) {
        try {
            // Store the token in Redis with an expiration time
            await redis.set(`blacklist:${token}`, 'true', 'EX', 24 * 60 * 60); // 1 day expiration
        } catch (error) {
            console.error('Error blacklisting token in Redis:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    res.clearCookie('token',{
        httpOnly: true,
        secure: true,
    });

    return res.status(200).json({
        message: 'User logged out successfully'
    });
}

async function getUserAddresses(req, res) {
    const id = req.user.id;

    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    return res.status(200).json({
        message: "User addresses fetched successfully",
        addresses: user.addresses
    });
}

async function addUserAddress(req, res) {
    const id = req.user.id;
    const { street, city, state, zip, country, isDefault } = req.body;

    const user = await userModel.findOneAndUpdate({ _id: id },{
        $push: {
            addresses: {
                street,
                city,
                state,
                zip,
                country,
                isDefault
            }
        }
    }, { new: true });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(201).json({
        message: "User address added successfully",
        address: user.addresses[user.addresses.length - 1] // Return the newly added address
    });
}

async function deleteUserAddress(req, res) {
    const id = req.user.id;
    const { addressId } = req.params;

    const isAddress = await userModel.findOne({
        _id: id,
        'addresses._id': addressId
    });

    if (!isAddress) {
        return res.status(404).json({
            message: "Address not found"
        });
    }

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        $pull: {
            addresses: { _id: addressId }
        }
    }, { new: true });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const addressExists = user.addresses.some(address => address._id.toString() === addressId);
    if (addressExists) {
        return res.status(500).json({
            message: "Failed to delete address"
        });
    }

    return res.status(200).json({
        message: "User address deleted successfully",
        addresses: user.addresses
    });
}

module.exports = { 
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    getUserAddresses,
    addUserAddress,
    deleteUserAddress
}