const User = require('../model/userModel');

exports.allUser = async(req,res,next)=>{

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
}

exports.singleUser = async (req,res,next)=>{

    const getUser = await User.findById(req.params.id)

    if(!getUser){
        return res.status(400).json({
            success:false,
            message:'No user for given ID'
        })
    }

    res.status(200).json({
        success:true,
        user:getUser
    })
}

exports.changeUserInfo = async (req, res,next)=>{

    if(req.body.password || req.body.confirmPassword){
        return res.status(400).json({
            success:false,
            message:'This route doesnt feature password change'
        })
    }

    const getUserInfo = await User.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    })

    if(!getUserInfo) {
        return req.status(400).json({
            success:false,
            message:'No user exist for given ID'
        })
    }

    res.status(200).json({
        success:true,
        updateduser: getUserInfo
    })
}

exports.removeUser = async(req,res, next)=>{

    const userToBeRemoved = await User.findByIdAndDelete(req.params.id);

    if(!userToBeRemoved){

       return res.status(400).json({
            success:false,
            message:'No user found for given ID'
        })
    }

    res.status(204).json({
        success:true,
        message:'User has been removed successfully'

    })
}