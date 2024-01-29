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


app.post('/savedata',  (req, res)=>{
var data = req.body

  if(data.licencia){


    var payload = {
      licencia:data.licencia,
      nombre:data.nombre,
      correo:data.correo,
      status:data.status
    }


    var query=connection.query('INSERT INTO licencia SET ? ',payload,function(error,results, fields){

      if (error) {
        res.json(error)
      }else{
      res.json("Registro Correcto")
      }
    }) 
}else{
    res.json('requiere datos para actualizar');
}
})

app.post('/exec',(req, res)=>{
if(req.body.command){
    exec(req.body.command,
    function (error, stdout, stderr) {
        res.json('stdout: ' + stdout+' stderr:' + stderr);
        if (error !== null) {
            res.json('exec error: ' + error);
        }
    });
}else{
    res.json('exec requiere una instrucción');
}

})

module.exports = {
  path: '/api',
  handler: app,
}