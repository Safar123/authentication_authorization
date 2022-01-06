const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true, 'Please enter valid username'],
        minlength:[3, 'Username must be three character long'],
        maxlength:[30, 'Username must be less than thirty character long']
    },

    email:{
        type:String,
        required:[true, 'Enter valid email'],
        unique:[true, 'User email already exist!! Please try another email'],
        validate:[validator.isEmail, 'Please provide valid email'],
        lowercase:true,
    },

    contactNumber:{
        type:Number,
        required:[true, 'Please provide valid phone number'],
        unique:true

    },

    password:{
        type:String,
        required:[true, 'Please set password of minimum 8 character'],
        minlength:[8, 'Please set password of minimum 8 character'],
        select:false
    },

    confirmPassword:{
        type:String,
        required:[true, 'Please provide matching password'],
        validate:{
            validator: function(el){
                return el === this.password
            }
        },
        message: 'Password did not match '
    },
    
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    },

    profileImage:{
        type:String
    }
});

userSchema.pre('save', async function(next){
    this.confirmPassword =undefined;
})

const User = new mongoose.model('User', userSchema);
module.exports = User;