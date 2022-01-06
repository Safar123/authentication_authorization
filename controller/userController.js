const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/asyncErrorHandler');

exports.allUser = catchAsync(async(req,res,next)=>{

    const userList = await User.find();

    if(!userList || userList.length ===0){

        return res.status(200).json({
            success:true,
            message:'No user exist currently'
        })
    }

    res.status(200).json({
        success:true,
        userNumber:userList.length,
        user: userList
    })
})

exports.singleUser = catchAsync(async (req,res,next)=>{

    const getUser = await User.findById(req.params.id)

    if(!getUser){
        return next(new AppError(`No User for ${req.params.id} ID`, 400))
    }

    res.status(200).json({
        success:true,
        user:getUser
    })
})

exports.changeUserInfo = catchAsync(async (req, res,next)=>{

    if(req.body.password || req.body.confirmPassword){
        return next(new AppError('This route does not support password change', 400))
    
    }

    const getUserInfo = await User.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })

    if(!getUserInfo) {
        return next(new AppError(`No User for ${req.params.id} ID`))
     
    }

    res.status(200).json({
        success:true,
        updateduser: getUserInfo
    })
})

exports.removeUser = catchAsync(async(req,res, next)=>{

    const userToBeRemoved = await User.findByIdAndDelete(req.params.id);

    if(!userToBeRemoved){
    return next(new AppError(`No User for ${req.params.id} ID`, 400))
    }

    res.status(204).json({
        success:true,
        message:'User has been removed successfully'

    })
})