const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser());


const authroutes = require('./routes/auth.routes')
app.use('/api/auth' , authroutes);

module.exports = app;