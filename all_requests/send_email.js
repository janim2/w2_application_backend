const nodemailer = require("nodemailer")


var sendVerificationMail = function(verificationUrl,userEmail,theusername){
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: '587',
      //service: 'gmail',
      auth: {
        user: 'cscodelab@gmail.com',// change to their email 
        pass: ""//google-app-sign-in-email password 
      },
      secureConnection: 'false',
      tls: {
          rejectUnauthorized: false
      }
    });
  
  
  
    // Send email containing HTML:
      var mailOptions = {
        from: 'cscodelab@gmail.com',
        to: userEmail,//'norbertaberor@gmail.com',
        subject: 'Email verification - W2 Application',
        text:'That was Easy !!',
        html:'<b> Hey there !!</b>  <br> Please, verify your Email to continue to the next step<br/> ',
         
      }
  
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(`THE ERR: ${error}`);
          //res.send("Bad State");
        } else {
          //res.send("OKAY")
          console.log('Email sent: ' + info.response);
        }
      });
  
  }
  
  module.exports = sendVerificationMail