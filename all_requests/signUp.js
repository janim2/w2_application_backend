const express = require("express");
const encryptor = require("../EncryptDecrypt/encrypt");
const mysqlConnection = require("../../../mysql_connection/connections");
const sendVerificationCode = require("./send_email");
const verifyMail = require("./send_email");
const sendVerificationMail = require("./send_email");
const registerUserRoute = express.Router()

registerUserRoute.post("/register",(req,res)=>{
    var name = req.query.full_name
    var email = req.query.email
    var passwordRaw = req.query.password
    var profile_picture = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.inverse.com%2Fentertainment%2Favatar-the-last-airbender-theories-easter-egg-flameo-hotman-meaning&psig=AOvVaw22KzSNaF0JX_gExu65xTS_&ust=1604749323523000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND5jrDr7ewCFQAAAAAdAAAAABAE"
    var school =req.query.school
    var phone_number = req.query.phone_number
    var residential_address = req.query.residential_address

    
        // Encrypt User Password
    var password = encryptor(passwordRaw.toString())

    // Get the name portion of the email and append a random string to it to give => uid
    var splitEmail = email.toString().split("@")
    var subEmail   = splitEmail[0].toString() 
    var uid =   encryptor(subEmail)+randomAlphaNumeric(8);


    // Select The Verify if the Email does not already exist
    var verifyQuery = `SELECT * FROM students WHERE email='${email}'`;

    // Random UID for verification Code
    var verificationMailCode = randomAlphaNumeric(6);

    // Verification Url
    var verificationUrl = `http://localhost:3000/verifymail?email=${email}&code=${verificationMailCode}`
        
    // Add new user to database if user does not exist and user is not verified
    var insertUser  = 
    `INSERT INTO students(user_id,profile_picture,full_name,email,school,password,phone_number,residential_address,verification_code,is_logged_in) 
     VALUES('${uid}','${profile_picture}','${name}','${email}','${school}','${password}','${phone_number}','${residential_address}','${verificationMailCode}','yes')`;

    // Update the user name password and verification code if the email already exist,
    var updateTable = `UPDATE students SET name='${name}', password='${password}',verification_code='${verificationMailCode}',is_logged_in='yes'`;
    
    // Insert user into database
    mysqlConnection.query(verifyQuery,(err,rows,cols)=>{

        if(rows.length > 0 ){
            if(rows[0].email_verified === 1){
                console.log("row verified === 1");
                res.send({"msg":"user already exist","uid":uid})
            }else{

            console.log("row not verified, updating ...");

            addUser(updateTable,res) 

            // send email Verification
            sendVerificationMail(verificationUrl,email,name)
            // sendVerificationMail
                          
            }
        }else{

            // console.log("no user yet so added");

            addUser(insertUser,res) 
            // send email Verification
            sendVerificationMail(verificationUrl,email,name)

        }
    })      

        
    });




    function randomAlphaNumeric(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-=+[{]}?';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));               
        }
        return result;
     }


    function addUser(insertQuery,res) {

        mysqlConnection.query(insertQuery,(err,rows,cols)=>{
            if(!err){
                res.send({"msg":"successful"})
            }else{
                res.send({"msg":"error"})
            }
        });        
    } 


    module.exports = registerUserRoute