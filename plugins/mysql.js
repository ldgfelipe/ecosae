var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Saecsa-15',
  database : 'ecosystem'
});
 
connection.connect();
 

export default (context, inject) => {
    inject('mysql', connection)
}