import React, { Component } from 'react';
import './App.css';
import Client from './components/client';
import Admin from './components/admin';

//react-sovelluksen pääkomponentti. pidetään state reactin best practicen mukaisesti mahdollisimman ylhäällä.
class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      isAdmin: false
    };
   
    console.log("pohjasivu")

  }

  handleClick = () => this.setState({isAdmin: !this.state.isAdmin});

  render() {
    //admin-näkymä
    if (this.state.isAdmin) {
      return (
        <div className="App">
          <h2 className="center">CGI-project: admin</h2>
          <div className="center">
            <button className="waves-effect blue darken-1 btn white-text" onClick={this.handleClick}>Asiakas-näkymä</button>
          </div>
          <Admin />
        </div>
      )
    }
    //asiakasnäkymä
    else {
      return (
        <div className="App">
        
        <h2 className="center">CGI-project</h2>
        <div className="center">
          <button className="waves-effect blue darken-1 btn white-text" onClick={this.handleClick}>Admin-näkymä</button>
        </div>
        <Client />

        </div>
      );
    }
    
  }
}

export default App;
