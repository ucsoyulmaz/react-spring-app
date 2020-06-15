//Required packages and libraries to be used in this page
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import './login.css';

//This class file is for handling the login action of each type of user by using API connection.
class Login extends Component {
  //Constructor elements to store state variables and binding functions(from beginning of the execution to ending)
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      password: '',
      username: '',
      loginStatus: '',
      homePageRequested: false
    }
    //These bindings call input change handler functions during the whole of the execution of this page
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.goToHomePage = this.goToHomePage.bind(this);
  }
  //Input change handler functions
  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  goToHomePage(){
    this.setState({ homePageRequested: true});
  }

  //This function handles the login action by using an API service,based on the result, the loginStatus state is modified.
  login(){
    const request = async () => {
      const response = await fetch('http://www.aboutsoftwareengineering.com:8081/users/loginresult', { 
        method: 'get', 
        headers: {
          'Authorization': 'Basic '+btoa(this.state.username + ':' + this.state.password), 
        }
      });
      const responseData = await response.json();
      
      this.setState({ loginStatus: responseData.status});
    }
    request();
  }

  
  //Render function to display UI components
  render() {
    if (this.state.homePageRequested == true) {
        return <Redirect to={{
                  pathname: '/'}}/>
    }

    if(this.state.loginStatus == "1000"){
      return <Redirect to={{
        pathname: '/', state: {isLoggedin:true}}}/>
    }

    return ( 
        <div>
            <div>
                <button className = "right-hand-corner-button" onClick={this.goToHomePage.bind(this)}>
                    Home Page
                </button>
            </div>
            <div>
                Username &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" caption="Username" value={this.state.username} onChange={this.handleChangeUsername} />
            </div>
            <div>
                Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" caption="Password" value={this.state.password} onChange={this.handleChangePassword} />
            </div>
            <div>
                <button onClick={this.login.bind(this)}>
                    Login
                </button>
            </div>
            <div>
                {this.state.loginStatus}
            </div>
        </div>
    );
  }
}
export default Login;