var mysql = require('mysql');
var config = require('./template.js');
var express = require('express');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
host     : config.dbserver,
user     : config.dbname,
password : config.dbpass, 
database : config.dbselect 
});

// Constants
const PORT = 8080;

// Help
const helptext = "Valid paths: \n /api/owner: POST [owner], gets APIs by owner\n";

// App
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.get('/',function(req,res){
		res.send(helptext);
		});
app.post('/api/owner', function (req, res) {
		var owner = req.body.contact;
		var sql    = 'SELECT * FROM api WHERE contact = ' + connection.escape(owner);
		connection.query(sql, function(err, results) {
				res.send(results)
				});
		});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
