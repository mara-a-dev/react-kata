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
  			headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
			mode:"cors",
			cache: true,
			body: JSON.stringify(box)
  		});

		fetch(request).then(function(response){
		   if (!response.ok) {
		   		return response.text().then(result => Promise.reject(new Error(result)))
			}
			
		    console.log(JSON.parse(response.json()));
			
	    })
	    
		.catch(function (err) {
		    console.log("errorzzz")
		});
	  	
  		
   }
 

	listAlarms(event){

		//let alarms = this.state.alarms;
	    fetch("http://localhost:3001/api/list")
	    .then(function (response) {
		   if (!response.ok) {
		   		//return response.text().then(result => Promise.reject(new Error(result)))
			}
			

		    var list =response.json();
		    var element;
		    
		    list.then(function(obj){
		    	for(element in obj[0])
		    		console.log(element);
		    })

			
	    })
	    
		.catch(function (err) {
		    console.log("errorzzz" + err) 
		});
	
	/*   .then(resp => resp.text())
      .then(data => {
        console.log(data);
      })*/
	}



	alertAlarms(event){
	event.preventDefault();
	var id ={
		id: 55
	};

		var request = new Request('http://localhost:3001/api/alert',{
  			method: 'POST',
  			headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
			mode:"cors",
			cache: true,
			body: JSON.stringify(id)
  		});

		 fetch(request).then(function(response) {
		   if (!response.ok) {
		   		return response.text().then(result => Promise.reject(new Error(result)))
			}
			
			console.log(response.json());

			
		    })
			.catch(function (err) {
			    console.log("errorzzz")
			});
		
	}



	reportAlarms(){

		 fetch("http://localhost:3001/api/report").then(function(response) {
	       
		   if (!response.ok) {
		   		//return response.text().then(result => Promise.reject(new Error(result)))
			}
			
		    console.log(response.json());
		    
			
	    })
	    
		.catch(function (err) {
		    console.log("errorzzz" + err) 
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
			      		<button className="report-button" onClick={ this.reportAlarms.bind(this) }>Report</button>
			      	</div>
			      	<div className="table-style">
			      		<ul>
			      		{boxes.map(box => <li key={box.counter}>{box.description}</li>)}
			      		</ul>
			      		<h2>List of alarm devices in the database:</h2>
			      		<div>
			      		<pre>
			      		{JSON.stringify(this.alarms)}
			      		</pre>
				      		<table>
					      		<tbody>
					      		<tr>
					      		<td className="td-style">ID</td>
					      		<td className="td-style">Name</td>
					      		<td className="td-style">Description</td>
					      		</tr>
					      		<tr>
					      		<td className="td-style" ref= "alarm_id" key="alarm_id">1</td>
					      		<td className="td-style">Alarm_1</td>
					      		<td className="td-style">Desc of alarm 1</td>
					      		<td className="button" onClick={ this.alertAlarms.bind(this) }>alarm</td>
					      		</tr>

					      		<tr>
					      		<td className="td-style" ref= "alarm_id" >2</td>
					      		<td className="td-style">Alarm_2</td>
					      		<td className="td-style">Desc of alarm 2</td>
					      		<td className="button" onClick={ this.alertAlarms.bind(this) }>alarm</td>
					      		</tr>
					      		<tr>
					      		<td className="td-style" ref= "alarm_id">3</td>
					      		<td className="td-style">Alarm_3</td>
					      		<td className="td-style">Desc of alarm 3</td>
					      		<td className="button" onClick={ this.alertAlarms.bind(this) }>alarm</td>
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