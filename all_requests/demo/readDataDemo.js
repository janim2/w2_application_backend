const express = require("express")
const mysqlConnection = require("../../mysql_connection/connections")
const readAllAnswers = express.Router()

    readAllAnswers.post("/read_answers",(req,res)=>{
        var query = `SELECT * FROM answers`
        mysqlConnection.query(query,(err,rows,cols)=>{
            if(!err){
                res.send(rows)
            }else{
                // console.log(`THE ERROR: ${err}`);
                res.send({"msg":"failed"})
            }
        })
    })

    module.exports = readAllAnswers