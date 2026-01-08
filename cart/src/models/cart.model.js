const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                require: true,
            },
            quantity:{
                type: Number,
                require: true,
                min: 1,
            }
        }

    ]
} ,{timestamps: true});

module.exports = mongoose.model('cart', cartSchema);
