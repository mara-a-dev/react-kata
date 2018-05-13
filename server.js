var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const app = express();
const PORT = 4000;


var con = mysql.createConnection({
  user: "admin",
  password: "admin",
  database: "react_db",
  host: "localhost",
  port: 3306,
  max: 10
});


app.post('/api/new',function(request,response){
	console.log(request.body);
	var description = request.body.desc;

	con.connect(function(err) {
		if (err)
	  	{
	  		return console.log(err);
	  	}
	  	else{

		  	var sql = "INSERT INTO alarm_device (description) VALUES ('" + description + "')";
	  		con.query(sql, function (err, result) {
			    if (err) 
		    	{
		    		return console.log(err);
		    	}
		    	else{
		    		console.log(result);
		    		//con.end();
		    	}
	  		});
		}
	});
})

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


app.use(morgan('dev'));

app.use(function(require,response, next){ //request from react client site, all the way back to postgres and epress api
	response.header("Access-control-Allow-Origin", "*");
	response.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

*/




app.listen(PORT, () => console.log("listening to port "+PORT));