var mysql = require('/node_modules/mysql');
var express = require('/node_modules/express');
var cors = require('/node_modules/cors');
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "react_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());

app.get('/',(req,res) => {
	res.send('hello from the server')
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});