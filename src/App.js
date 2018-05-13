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
  		var desc = (event.textIn.value);
  		console.log(desc); 

  		var request = new Request("http://localhost:4000/api/new",{
  			method: 'POST',
  			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			    data: desc
			})
  		});

  		fetch(request).then((response) => response.json()).then((desc) => {console.log(desc);
  			
  		})
  	}

	listAlarms(){
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
		      			<div><input type="text" placeholder="Enter Description" className="text" ref={(textIn) => { this.textIn = textIn }}></input>
				    	<button className="button-right" onClick={ this.handleSubmit }>Create Alarm</button>
			      		</div>
				    	<button className="button-right" onClick={ this.listAlarms }>List Alarms</button>
				      	<button className="button-right" onClick={ this.reportAlarms }>Report</button>
			      	</div>
			      	<div className="table-style">
			      		<div>List of alarm devices in the database:</div>
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