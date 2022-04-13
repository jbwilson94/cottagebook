const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const signToken = userID => {
    return JWT.sign({
        iss: process.env.SECRET_KEY+'',
        sub: userID
    }, process.env.SECRET_KEY+'', { expiresIn: "1h" });
}

userRouter.post('/register', ( req,res ) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, ( err, user ) => {
        if(err) res.status(500).json({ message : {msgBody : "Error has occured", msgError : true}});
        if(user) res.status(400).json({ message : {msgBody : "Username is already taken", msgError : true}});
        else {
            const newUser = new User({ username, password, role });
            newUser.save( (err) => {
                if(err) res.status(500).json({ message : {msgBody : "Error has occured", msgError : true}});
                else res.status(201).json({ message : {msgBody : "Account Created", msgError : false}});
            });
        }
    });
});

userRouter.post('/login', passport.authenticate('local', { session : false }), (req,res) => {
    if(req.isAuthenticated()){
        const { _id, username, role, screenName, email } = req.user;
        const token = signToken( _id );
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: { username, role, screenName, email  }});
    }
});

userRouter.get('/logout', passport.authenticate('jwt', { session : false }), (req,res) => {
    res.clearCookie('access_token');
    res.json({user:{username: "", role: ""}, success: true});
});

userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req,res) => {
    if(req.user.role === 'admin') res.status(200).json({ message: {msgBody: 'You are an admin', msgError: false}});
    else res.status(403).json({ message: {msgBody: "Access Denied", msgError: true}})
});

userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { username, role, screenName, email} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username, role, screenName, email}});
});

userRouter.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username } = req.body;
    User.findOneAndDelete({ username });
})

userRouter.patch('/change-pass', (req, res) => {
    const { username, password } = req.body;
    User.findOne({username:[username]}, (error,user) => {
        if(error) console.log(error);
        else {
            user.setPassword(password);
        }
    })
});

userRouter.patch('/update-settings', (req, res) => {
    const { screenName, email, username } = req.body;
    User.findOne({username:[username]}, (error,user) => {
        if(error) console.log(error);
        else {
            user.updateSettings(screenName,email);
        }
    })
});

module.exports = userRouter;
