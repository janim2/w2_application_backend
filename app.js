var express = require('express');
const insertAnswers = require('./all_requests/demo/insertDemo');
const readAllAnswers = require('./all_requests/demo/readDataDemo');
var app = express()
const http = require('http').createServer(app)

//                           use Custom routes
// const loginRouter = require('./requests/auth/normal_user/login_user');



app.get('/', function(req, res){
    res.send("<center><h2>WELCOME TO <h1>w2 Schools Application</h1></h2></center>");
  });


  // ########### use Custom routes########### //
  //app.use(loginRouter) // loginRouter was imported in the comment aboove
    app.use(insertAnswers)
    app.use(readAllAnswers)



// Route to use when the requested route is not found on server
app.get('*', function(req, res){
    res.status(404).send(' Resource Not Found ');
  });

  // host environment
  const myhost = process.env.HOST || 'localhost'

    // connect With HTTP and listen On Port 8080 or Available PORT
    http.listen(
        process.env.PORT || 3000,myhost,()=>{
        console.log("running on port 3000");
      })