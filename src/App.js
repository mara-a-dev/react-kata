import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(){
		super();
		this.state = {
			desc : '',
			boxes: [],
			alarms: [],
			reports: [],
			searchResult: [],
			counter: 0,
			list_page : false,
			report_page : false
		};
	}

	handleChange (event) {
	    this.setState({ desc: event.target.value});
	}

	handleSubmit (event) {

  		event.preventDefault();
  		if(this.refs.text_input.value === "")
  			alert("Please enter description to your new alarm");
  		else{

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
	    	}).catch(function (error) {
			    console.log(error)
			});
	  	
  		}
  		
   }
 

	listAlarms(){

		this.setState({
			report_page: false,
			list_page: true
		})

		fetch("http://localhost:3001/api/list")
	    .then((response) => {
		   if (!response.ok) {
		   		 throw Error(response.statusText);
			}

		        response.json()
		        .then((alarms) => {	
		            this.setState({alarms: alarms,}); 
		        });
		    })
		.catch(function (err) {
		    console.log("errorzzz" + err) 
		});
		
	}

	reportAlarms(){
		
		this.setState({
			report_page: true,
			list_page: false
		})
		 fetch("http://localhost:3001/api/report")
		 .then((response) => {
	       
		   if (!response.ok) {
		   		throw Error(response.statusText);
			}
			
		    response.json()
	        .then((reports) => {	
	            this.setState({reports: reports,}); 
	        });	    
	    })
		.catch(function (err) {
		    console.log("errorzzz" + err) 
		});
	}

	searchLog (event) {

  		event.preventDefault();
  		if(this.refs.log_input.value === "")
  			alert("Please enter number of alarm");
  		else{

		    let log = {
		    	id : this.refs.log_input.value,
		    };

	  		var request = new Request('http://localhost:3001/api/search',{
	  			method: 'POST',
	  			headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
				mode:"cors",
				cache: true,
				body: JSON.stringify(log)
	  		});

			fetch(request).then(function(response){
			   if (!response.ok) {
		   		throw Error(response.statusText);
			}
			
		    response.json().then((searchResult) => {	
		            this.setState({searchResult: searchResult,});
		        });   
	        	    
	    }).catch(function (err) {
		    console.log("errorzzz" + err) 
		});
	  	
  		}
   }

	alertAlarms(event){

		event.preventDefault();
		var indx = event.target.id;
		let id ={
			id: event.target.id
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
			
			alert("Log has been created for Alarm_"+indx);
			
		    })
			.catch(function (error) {
			    console.log(error)
		});	
	}

  	render() {
  		let boxes = this.state.boxes;
  		let r_page = this.state.report_page ? "block": "none";
		let l_page = this.state.list_page ? "block": "none";
  		
    	
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
			      		<button className="list-button" onClick={this.listAlarms.bind(this)}>List Alarms</button>
			      		<button className="report-button" onClick={ this.reportAlarms.bind(this) }>Report</button>
			      	</div>

			      	<div>
				      	<div className="list_container" style={{display: l_page}}>
				      		
				      		<h2>List of alarm devices in the database:</h2>
				      		<table>
				      		<tbody>
					      		<tr>
					      			<td className="td-style"></td>
						      		<td className="td-style">ID</td>
						      		<td className="td-style">Name</td>
						      		<td className="td-style">Description</td>
					      		</tr>
					      		{this.state.alarms.map(alarm => 
					      			<tr key={alarm.ID} >
					      			<td className="button" id={alarm.ID} onClick={this.alertAlarms}>alarm</td>
					      			<td className="td-style">{alarm.ID}</td>
					      			<td className="td-style">Alarm_{alarm.ID}</td>
					      			<td className="td-style">{alarm.description}</td>

				      			</tr>)}
				      		</tbody>
				      		</table>			     

				      	</div>
				      	
				      	<div className ="report_container" style={{display: r_page}}>
				      		<div>
					      		<input type="text" placeholder="Search by alarm number" className="text" ref="log_input"></input>
					    		<button className="add-button" onClick={this.searchLog.bind(this)}>Search</button>	
				      		</div>
				      		<h2>List of alarm logs in the database:</h2>
			      			<table>
					      		<tbody>
						      		<tr>
							      		<td className="td-style">ID</td>
							      		<td className="td-style">Date</td>
							      		<td className="td-style">Alarm Device</td>
						      		</tr>
						      		{this.state.reports.map(log => 
						      			<tr key={log.ID} >
						      			<td className="td-style">{log.ID}</td>
						      			<td className="td-style">{log.created_date}</td>
						      			<td className="td-style">Alarm_{log.alarm_device_id}</td>

					      			</tr>)}

					      			{this.state.searchResult.map(res => 
						      			<tr key={res.ID} >
						      			<td className="td-style">{res.ID}</td>
						      			<td className="td-style">{res.created_date}</td>
						      			<td className="td-style">Alarm_{res.alarm_device_id}</td>

					      			</tr>)}
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