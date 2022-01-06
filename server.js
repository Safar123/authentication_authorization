const dotenv = require('dotenv');
const app = require('./app');
const dbConnection = require('./databaseConfig/dbConnection');


dotenv.config({path:'./config/config.env'});
dbConnection();

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode`)
})


