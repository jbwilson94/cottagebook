require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
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

app.use(express.static(path.join(__dirname,"client", "build")));
app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

const port = process.env.PORT;

app.listen(port || 5000, () => console.log("Server Started"))