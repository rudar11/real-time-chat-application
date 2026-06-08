const express = require('express');
const cookieparser = require('cookie-parser')

const connectdb = require('./db/db')
const app = express();
app.use(cookieparser())
app.use(express.json())
connectdb()









module.exports = app