const express = require("express")
const mysqlConnection = require("../../mysql_connection/connections")
const insertAnswers = express.Router()

    insertAnswers.post("/add_answer",(req,res)=>{
        
        console.log("inside");
        
        var quiz_id = req.query.quiz_id
        var course_id = req.query.course_id
        var student_id = req.query.student_id
        var question_number = req.query.question_number
        var status = req.query.status
        var time_answered = req.query.time_answered

        var insertQuery = `INSERT INTO answers(quiz_id,course_id,student_id,question_number,status,time_answered) 
                           VALUES('1','2','3','4','not answered','20:21:02')`


        mysqlConnection.query(insertQuery,(err,rows,cols)=>{
            if(!err){
                res.send({"msg":"Successful"})
            }else{
                res.send({"msg":"failed"})
            }
        })
    })


    module.exports = insertAnswers