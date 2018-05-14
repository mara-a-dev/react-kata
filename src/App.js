import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructer(){
		
	}

	componentDidMount(){
		console.log("mounted!");
	}

	handleSubmit (event) {
  		event.preventDefault();
  		
	    let data = {
	    	description : "hello"
	    };

  		var request = new Request('http://localhost:3001/api/new',{
  			method: 'POST',
  			headers: new Headers ({
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
			}),
			mode: 'no-cors',
			cache: true,
			body: JSON.stringify(data)
  		});

  		fetch(request).then(function(response){

  			if (response.ok) {
			  console.log("ok res")
			} else if (response.status === 401) {
			  response.json().then(function(data){
  				console.log(data)
  			})
			} else {
			  console.log(" No JSON expected or available for these error codes.")
			}
  		}).catch(function(response){
  			console.log("do");
  		})
  		
    }
 

	listAlarms(){

		 var myVar = {"id" : 1};
		    console.log("tuleb siia");
		    fetch("http://localhost:3001/api/list", {
		        method: "POST",
		        headers: {
		            "Content-Type": "text/plain"
		        },
		        body: JSON.stringify(myVar)
		    }).then(function(response) {
		        return response.text();
		    }).then(function(muutuja){
		       // document.getElementById('väljund').innerHTML = muutuja;
		    });
		
	}

	reportAlarms(){

	}

  	render() {
  	
    	return (
    	<div className="App">
	        	<div className="App-header">
	          		<img src={logo} className="App-logo" alt="logo" />
	          		<h2>Alarm System App in React</h2>
	        	</div>
	        <div className="App-intro">

		      	<div className ="container">

		      		<div>
		      			<input type="text" ref="text_input" placeholder="Enter Description" className="text"></input>
				    	<button className="add-button" onClick={ this.handleSubmit }>Add Alarm</button>	
			      	</div>

			      	<div className="inner-cont">
			      		<button className="list-button" onClick={ this.listAlarms }>List Alarms</button>
			      		<button className="report-button" onClick={ this.reportAlarms }>Report</button>
			      	</div>
			      	<div className="table-style">
			      		<h2>List of alarm devices in the database:</h2>
			      		<div>
				      		<table>
					      		<tbody>
					      		<tr>
					      		<td className="td-style">ID</td>
					      		<td className="td-style">Name</td>
					      		<td className="td-style">Description</td>
					      		</tr>
					      		<tr>
					      		<td className="td-style">1</td>
					      		<td className="td-style">Alarm_1</td>
					      		<td className="td-style">Desc of alarm 1</td>
					      		<td className="button">alarm</td>
					      		</tr>

					      		<tr>
					      		<td className="td-style">2</td>
					      		<td className="td-style">Alarm_2</td>
					      		<td className="td-style">Desc of alarm 2</td>
					      		<td className="button">alarm</td>
					      		</tr>
					      		<tr>
					      		<td className="td-style">3</td>
					      		<td className="td-style">Alarm_3</td>
					      		<td className="td-style">Desc of alarm 3</td>
					      		<td className="button">alarm</td>
					      		</tr>
					      		<tr></tr>
					      		</tbody>
				      		</table>
			      		</div>
			      	</div>
		      	</div>
	        </div>
	      </div>

	    );
	
  }
}

export default App;