import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  componentDidMount() {

    axios.get('http://localhost:3000/api/v1/specialists/all').then((response)=> {
            
      console.log(response.data);
      return;
    

  });


  }

  render() {
    return (
      <div className="App">
       Tämä on react front-end
      </div>
    );
  }
}

export default App;
