import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {username: '', email:'', password: ''}
    this.submitValue = this.submitValue.bind(this);
  }

  componentDidMount(){

  }

  submitValue(e){
    e.preventDefault();
    if(this.state.username !== '' && this.state.email !== '' && this.state.password !== ''){
      console.log('UserName: '+this.state.username+'Email: '+this.state.email+' Password: '+this.state.password);
                axios.get('http://localhost:4000/users/add', {
                'headers': {
                  username: this.state.username, 
                  email: this.state.email, 
                  password: this.state.password
                }})
                .then((response) => {
                console.log(response.status)
            }).catch((error) => {
                console.log(error)
            });
    }
    else{
      alert('fill all the field');
    }
    
  }

  render() {
    return (
      <div className="register">
        <form><br /><br />
        <input type="text" placeholder="username" onChange={e => {this.setState({username: e.target.value})}} /><br /><br />
        <input type="text" placeholder="email" autoComplete='email' onChange={e => {this.setState({email: e.target.value})}} /><br /><br />
        <input type="password" placeholder="password" autoComplete='password' onChange={e => {this.setState({password: e.target.value})}} /><br /><br />
        <button onClick={this.submitValue} >Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
