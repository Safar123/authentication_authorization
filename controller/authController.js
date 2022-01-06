const User = require('../model/userModel');
const catchAsync = require('../utils/asyncErrorHandler');
const AppError= require('../utils/appError')

exports.signUpUser = catchAsync(async(req,res,next)=>{

    const newUser = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        contactNumber:req.body.contactNumber,
        profileImage:req.body.profileImage
    });

    if(!newUser){
        return next(new AppError('Something went wrong while creating user', 500))
        
    }

    res.status(201).json({
        success:true,
        user: newUser
    })
});