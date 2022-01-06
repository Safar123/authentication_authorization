const mongoose = require('mongoose')

const dbConnection = function(){

    mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(con => console.log(`Database connected successfully as ${con.connection.host}`))
    .catch(err=>console.log(err))
}


module.exports = dbConnection;

