const User = require('../model/userModel');

exports.signUpUser = async(req,res,next)=>{

    const newUser = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        contactNumber:req.body.confirmPassword,
        profileImage:req.body.profileImage
    });

    if(!newUser){
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }

    res.status(201).json({
        success:true,
        user: newUser
    })
}