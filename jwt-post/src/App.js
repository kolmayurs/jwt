import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  componentDidMount(){
let url = 'http://localhost:4000/users';
let jwtStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Ik1heXVyIiwiZW1haWwiOiJtYXl1ckBtYXl1cmtvbGkuY29tIn0sImlhdCI6MTUyNzA3Nzc5OX0.3cMR2AETEu3SVpTiwECdnRB0schxwSVaYwY9uT3Bm-Q'
axios.get(url, {
'headers': {
  'auth': 'Bearer '+ jwtStr,
}})
.then((response) => {
      console.log(response.data)
  }).catch((error) => {
      console.log(error)
  });

}
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
