const AppError = require('./appError');
const responseDevError =(err, res)=>{
res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
    error:err,
    stack:err.stack
})
}

const responseProdError = (err, res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }

    else{
        res.status(500).json({
            status:'error',
            message:'Something went wrong !!!!!'
        })
    }

}

const handleCastErrorDB = err=>{
    const message = `Invalid ${err.path} : ${err.value}`;
    return new AppError(message, 400)

}

module.exports = (err,req,res,next)=>{

    err.statusCode =err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV==="development"){
       
        responseDevError(err,res)
    }

    else if(process.env.NODE_ENV==="production"){

        //let error ={...err}
        //console.log(error);
        if(err.name ==="CastError") {
            err= handleCastErrorDB(err)
        } 

        responseProdError(err, res)

    }
}