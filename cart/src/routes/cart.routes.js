const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const createAuthMiddleware = require('../middleware/auth.middleware');
const validation = require('../middleware/validation.middleware');

router.get('/',
    createAuthMiddleware([ 'user' ]),
    cartController.getCart
);

router.post('/items', validation.validateAddItemToCart, createAuthMiddleware(["user"]), cartController.addItemToCart);

router.patch(
    '/items/:productId',
    validation.validateUpdateCartItem,
    createAuthMiddleware([ 'user' ]),
    cartController.updateItemQuantity
);

module.exports = router;