
const mongoose = require('mongoose');

const addressesSchema = new mongoose.Schema({
    street:{type:String},
    city:{type:String},
    state:{type:String},
    zip:{type:String},
    country:{type:String},
    isDefault:{type:Boolean, default:false}
});

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        select:false,
        required:true,
    },
    fullname:{
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        enum:['user','seller'],
        default:'user',
    },
    addresses:[addressesSchema],
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;