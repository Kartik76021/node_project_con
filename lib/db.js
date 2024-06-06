var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
    port:3307,
	user:'root',
	password:'',
	database:'node_sec'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;