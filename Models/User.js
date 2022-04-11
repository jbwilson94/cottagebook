const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    username:{ 
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user',
        required: true
    },
    screenName:{
        type: String,
        default: ''
    },
    email:{
        type: Boolean,
        default: true
    }
})

UserSchema.methods.setPassword = function(pass) {
    this.password = pass;
    this.save();
    
}

// Passowrd Encryption
UserSchema.pre('save', function(next){
    if(!this.isModified('password')) 
        return next()
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err) return next(err)
        this.password = passwordHash
        next()
    })
})

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch) => {
        if(err) return cb(err)
        else if(!isMatch) return cb(null,isMatch)
        return cb(null,this)
    })
}

const User = mongoose.model('User', UserSchema)
module.exports = User