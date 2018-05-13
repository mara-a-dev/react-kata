import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	
	componentDidMount() {
		var desc = {this.text};
		console.log(desc);
    	axios.get('https://jsonplaceholder.typicode.com/users')
    	.then(res => {
    		console.log(res);
    		this.setState({persons : res.data});
    	});
  	}

	listAlarms(){
		axios.get('https://jsonplaceholder.typicode.com/users')
		 .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
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
	        <p className="App-intro">

		      	<div className ="container">

		      		<div>
		      			<div><input type="text" refs = "text" placeholder="Enter Description" className="text"></input>
				    	<button className="button-right" onClick={ this.componentDidMount }>Create Alarm</button>
			      		</div>
				    	<button className="button-right" onClick={ this.listAlarms }>List Alarms</button>
				      	<button className="button-right" onClick={ this.reportAlarms }>Report</button>
			      	</div>
			      	<div className="table-style">
			      		<div>List of alarm devices in the database:</div>
			      		<div>
			      		<table>
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
			      		</table>
			      		</div>
			      	</div>
		      	</div>
	        </p>
	      </div>

	    );
	
  }
}

export default App;