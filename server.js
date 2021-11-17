require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => console.log("Connected to MongoDB"))

app.use(passport.initialize());
app.use(cookieParser())

app.use("/api/calendar", require("./Controllers/CalendarController"))
app.use("/user", require("./Routes/User"))

app.listen(5001, () => console.log("Server Started"))