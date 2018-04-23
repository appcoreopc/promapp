import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import {GetTeamDataUrl, LoginUrl, UserNameEmptyMessage, PasswordEmtpyMessage, TeamEmptyMessage, ErrorSigningInMessage} from './shared';

class App extends React.Component {

	constructor(props) {		
		super(props);
		this.state = { username : "", password : "", team : "", rememberMe : false};		

		this.doLogin = this.doLogin.bind(this);
	}
	
	componentDidMount() {
	//	let instance = this; 
	//	request.get(GetTeamDataUrl, function(err, resp) {		 
	//	instance.createTeamItem(resp);		   
	//}); 
}

createTeamItem(resp) {

	let items = [];     
	
	if (resp) {

	   // mount ui depending on value returned 
	   //resp.array.forEach(element => {		
	   //	items.push(<option value="{element.value}">{element.text}</option>);   		
	   //});
	   
	}
	else 
	  items.push(<option value="Unassigned Team">Unassigned Team</option>);   
	
	return items;
}

handlePasswordChange = (event) => {
	this.setState({password : event.target.value});		
}

handleUserChange = (event) =>  {
	this.setState({username : event.target.value});
}

handleTeamChange = (event) =>  {
	console.log(event.target.value);
	this.setState({team : event.target.value});
}

doLogin = () => { 	
	
	debugger;
	if (this.state.username && this.state.username.length == 0){
		this.setState({errMessage : UserNameEmptyMessage});
		return;
	}
	
	if (this.state.password && this.state.password.length == 0){
		this.setState({errMessage : PasswordEmtpyMessage});
		return;
	}		
	
	if (this.state.team && this.state.team.length == 0){
		this.setState({errMessage : TeamEmptyMessage });
		return;
	}
	
	console.log(this.state);

	return;

	var instance = this;
	
	request.post(LoginUrl)
	.send({ username: this.state.username, password: this.state.password, team : this.state.team, rememberMe : this.state.rememberMe }) 
	.set('accept', 'json')
	.end((err, res) => {
		
		if (err) { 
			instance.setState({errMessage : ErrorSigningInMessage});
		}
		
	});
}

handleRememberMe = (event) => {

	if (event.target.checked)
	this.setState({rememberMe : event.target.checked});
}

render() {
	return (
		<div className="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<h1 className="App-title">Welcome to ProMapp</h1>
		</header>
		
		<div>
		
		<ul>
		<li> 
		<input type="text" placeholder="Username"  onChange={this.handleUserChange}/>
		</li> 
		<li> 
		<input type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
		</li> 
		
		<li> 
		<select type='select' onChange={this.handleTeamChange}> 
		{this.createTeamItem()}
		</select> 
		</li> 
		
		</ul>
		
		<li> 
		<p> {this.state.errMessage} </p>
		</li> 
		
		<li> 
		<button onClick={this.doLogin}>Login </button>
		</li> 
		<li> 
		<input type="checkbox" onClick={this.handleRememberMe}/> Remember me
		</li>
		</div>	   
		
		</div>
	);
}
}

export default App;
