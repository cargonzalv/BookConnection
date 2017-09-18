import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import axios from 'axios';
import HomePage from "./HomePage";
import App from "./App";


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <div>
      <TextField
      hintText="Enter your Username"
      floatingLabelText="Username"
      onChange = {(event,newValue) => this.setState({username:newValue})}
      />
      <br/>
      <TextField
      type="password"
      hintText="Enter your Password"
      floatingLabelText="Password"
      onChange = {(event,newValue) => this.setState({password:newValue})}
      />
      <br/>
      <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
      </div>
      </MuiThemeProvider>
      </div>
      );
  }
  handleClick(event){
    var apiBaseUrl = "http://localhost:3001/users/login";
   var self = this;
   var payload={
     "email":this.state.username,
     "password":this.state.password
   }
   axios.post(apiBaseUrl, payload)
   .then(function (response) {
    console.log(response)
     if(response.status == 200){
       console.log("Login successfull");
       var homePage=[];
       homePage.push(<HomePage appContext={self.props.appContext}/>)
       self.props.appContext.setState({loginPage:[],homePage:HomePage})
     }
     else if(response.status == 204){
       console.log("Username password do not match");
       alert("username password do not match")
     }
     else{
       console.log("Username does not exist");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
 }
}
const style = {
 margin: 15,
};
export default Login;