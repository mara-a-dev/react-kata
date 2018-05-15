import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(){
		super();
		this.state = {
			desc : '',
			boxes: [],
			counter: 0
		};
	}

	handleChange (event) {
	    this.setState({ desc: event.target.value});
	    
	  }

	handleSubmit (event) {
  		event.preventDefault();
  		let counter = this.state.counter;

	    let box = {
	    	description : this.refs.text_input.value,
	    	counter
	    };

	    counter +=1;

	    let boxes = this.state.boxes;

	    boxes.push(box);
	    this.setState({
	    	boxes: boxes,
	    	counter:counter
	    })

  		var request = new Request('http://localhost:3001/api/add',{
  			method: 'POST',
  			headers: new Headers ({
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
			}),
			mode:"no-cors",
			cache: true,
			body: JSON.stringify(box)
  		});

  		fetch(request).then(function(request, response){
  			
  			if (response.ok) {
			  console.log("ok res")
			} 
			else if (response.status === 401) {
			  	response.json().then(function(box){
	  				console.log("good")
	  			})
			} 
			else {
			  console.log(" No JSON expected or available for these error codes.")
			}
	  		}).catch(function(response){
	  			console.log("do");
	  	})
  		
   }
 

	listAlarms(event){
	    fetch("http://localhost:3001/api/list",{
	    	method: "GET",
	    	mode: 'no-cors',
	    	headers: new Headers ({
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
			})
	    })
	    .then(response => response.getJSON())
	    .then(parsedJSON => console.log(parsedJSON.result))
	    .catch(err=> console.log('fail', err))
	
	/*   .then(resp => resp.text())
      .then(data => {
        console.log(data);
      })*/
	}

	reportAlarms(){
		 fetch("http://localhost:3001/api/report").then(function(response) {
	        return response.text();
	    	}).then(function(err){
	    		console.log('error fetching data')
	    });
	}

  	render() {
  		let boxes = this.state.boxes;
    	return (
    	<div className="App">
	        	<div className="App-header">
	          		<img src={logo} className="App-logo" alt="logo" />
	          		<h2>Alarm System App in React</h2>
	        	</div>
	        <div className="App-intro">

		      	<div className ="container">

		      		<div>
		      			<input type="text" placeholder="Enter Description" className="text" ref="text_input"></input>
				    	<button className="add-button" onClick={this.handleSubmit.bind(this)}>Add Alarm</button>	
			      	</div>

			      	<div className="inner-cont">
			      		<button className="list-button" onClick={ this.listAlarms }>List Alarms</button>
			      		<button className="report-button" onClick={ this.reportAlarms }>Report</button>
			      	</div>
			      	<div className="table-style">
			      		<ul>
			      		{boxes.map(box => <li key={box.counter}>{box.description}</li>)}
			      		</ul>
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