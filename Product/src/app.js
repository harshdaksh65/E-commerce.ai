const cookieParser = require('cookie-parser');
const express = require('express');
const productRoute = require('./routes/product.route');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoute);


module.exports = app;