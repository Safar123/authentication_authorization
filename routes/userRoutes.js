const express = require('express');
const userRouter = express.Router();
const authConroller = require('../controller/authController')
const userController = require('../controller/userController');

userRouter.post('/signup', authConroller.signUpUser);
userRouter.post('/login', authConroller.logInUser);
userRouter.get(userController.allUser);


userRouter.route('/:id').get(userController.singleUser)
.patch(userController.changeUserInfo)
.delete(userController.removeUser);


module.exports = userRouter;