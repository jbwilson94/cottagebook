const passport = require('passport')
const localStrategy = require('passport-local').Strategy 
const jwtStrategy = require('passport-jwt').Strategy
const User = require('./Models/User')

const cookieExtractor = (req) => {
    let token = null
    if(req && req.cookies){
        token = req.cookies["access_token"]
    } return token
}

// Authorization (protecting endpoints)
passport.use(new jwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err,user) => {
        if(err) return done(err, false)
        if(user) return done(null, user)
        else return done(null, false)
    })
}))

// Authenticate local strat using username and password
passport.use(new localStrategy((username, password, done) => {
    User.findOne({username}, (err,user) =>{
        // Something went wrong with the DB
        if(err) return done(err)

        // If no user exists
        if(!user) return done(null, false)

        // Check if password is correct 
        user.comparePassword(password, done)
    })
}))