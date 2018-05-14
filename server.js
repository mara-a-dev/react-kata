var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

var con = mysql.createConnection({
  user: "admin",
  password: "admin",
  database: "react_db",
  host: "localhost",
  port: 3306,
  max: 10
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(request, response) {
    response.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);

app.post('/api/new',function(request,response){
	console.log(request.body);
	var description = request.body.desc;

	con.connect(function(err) {
		if (err)
	  	{
	  		return response.status(400).send(err);
	  	}
	  	else{

		  	var sql = "INSERT INTO alarm_device (description) VALUES ('" + description + "')";
	  		con.query(sql, function (err, result) {
			    if (err) 
		    	{
		    		return response.status(400).send(err);
		    	}
		    	else{
		    		return response.status(200).send(result);
		    		con.end();
		    	}
	  		});
		}
	});
})



/*
app.get('http://localhost:3000/api/list',function(request,response){
	
	con.connect(function(err) {
		if (err)
	  	{
	  		return response.status(400).send(err);
	  	}
	  	else{

		  	var sql = "SELECT * FROM alarm_device";
	  		con.query(sql, function (err, result) {
			    if (err) 
		    	{
		    		return response.status(400).send(err);
		    	}
		    	else{
		    		return response.status(200).send(result);
		    		//con.end();
		    	}
	  		});
		}
	});
})

app.get('/api/report',function(request,response){
	
	con.connect(function(err) {
		if (err)
	  	{
	  		return response.status(400).send(err);
	  	}
	  	else{

		  	var sql = "SELECT * FROM alarm_log ORDER BY created_date DESC";
	  		con.query(sql, function (err, result) {
			    if (err) 
		    	{
		    		return response.status(400).send(err);
		    	}
		    	else{
		    		return response.status(200).send(result);
		    		//con.end();
		    	}
	  		});
		}
	});
})
*/
app.use(function(require,response, next){ //request from react client site, all the way back to epress api
	response.header("Access-control-Allow-Origin", "*");
	response.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});



app.listen(port, () => console.log("listening to port "+port));