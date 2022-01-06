const express = require('express');
const app = express();
const errorHandler = require('./utils/errorHandler');
const userRoute = require('./routes/userRoutes')

app.use(express.json())

app.use('/api/v1/users', userRoute);

app.use(errorHandler)
module.exports = app;