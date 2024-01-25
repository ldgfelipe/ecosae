// Import dependencies
const express = require('express')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Saecsa-15',
    database : 'ecosystem'
  });
  connection.connect();  
// Create app instance
const app = express()
var exec = require('child_process').exec;
// Define JSON as return type
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'SAECSA-rest ok' })
})

 app.get('/connect', async(req, res)=>{


        var rows = await new Promise((resolve, reject) => {
          connection.query('SELECT * FROM licencia', (error, results) => {
            if (error) {
              reject(error)
        
            } else {
              resolve(results)
            }
          })
        })
        res.json({licencia:rows})
})

app.get('/exec',(req, res)=>{
    exec('git pull origin dev',
    function (error, stdout, stderr) {
        res.json('stdout: ' + stdout+' stderr:' + stderr);
        if (error !== null) {
            res.json('exec error: ' + error);
        }
    });

})

module.exports = {
  path: '/api',
  handler: app,
}