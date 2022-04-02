const nodemailer = require("nodemailer");
const router = require("express").Router();
const User = require('../Models/User');

router.post("/send-email", async (req, res) => {
    let message = req.body.message;
    console.log(":"+message);
    let emailList = "";
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "cottagebooker@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    User.find({}, (err,users) => {
      if(err) console.log("error");
      users.map(user => {
        emailList = emailList+""+user.username+",";
      })
      let mailOptions = {
        from: '"CottageBook 📖" <cottagebooker@outlook.com>', // sender address
        to: emailList, // list of receivers
        subject: "New Cottage Booking", // Subject line
        text: message, // plain text body
        html: "<b>"+message+"</b>", // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.sendStatus(554);
            console.log(error);
        } else {
            res.sendStatus(201);
        }
    })
    })    
});

module.exports = router;
