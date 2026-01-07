const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {
        amount: {type: Number, required: true},
        currency: {type: String, enum: ['USD', 'INR'], default: 'INR'},
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    images:[{
        url: String,
        thumbnail: String,
        id: String
    }]
},
{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'  
    }
})

module.exports = mongoose.model('product', productSchema);