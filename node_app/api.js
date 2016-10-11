var mysql = require('mysql');
var config = require('./template.js');
var express = require('express');
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : config.dbserver,
  user     : config.dbname,
  password : config.dbpass, 
  database : config.dbselect 
});

// Constants
const PORT = 8080;

// App
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post('/api/owner', function (req, res) {
 	var owner = req.body.owner;
 	res.send(owner);	
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
