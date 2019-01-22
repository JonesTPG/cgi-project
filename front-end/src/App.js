import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Specialist from './components/specialist';


//react-sovelluksen pääkomponentti. pidetään state reactin best practicen mukaisesti mahdollisimman ylhäällä.
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      specialists: null
    };

  }

  //haetaan spesialistit apista
  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/specialists/all').then((response)=> {
      console.log(response.data);
      this.setState({
        specialists: JSON.parse(response.data)
      })
      return;
  });


  }

  render() {

    //spesialisteja ei ole vielä saatu ladattua apista
    if (this.state.specialists == null) {
      return (
        <p>ladataan tietoja apista</p>
      )
    }

    //spesialistit ladattu, renderöidään frontti
    else {
      return (
        <div className="App">
        
          <h2 className="center">Varaa aika spesialistilta</h2>

          {
              this.state.specialists.map(specialist => (
                <Specialist 
                  firstname={specialist.firstname}
                  lastname={specialist.lastname}
                  role={specialist.role}
                  key={specialist._id}
                />

              )
                )

          }

        </div>
      );
    }
  }
}

export default App;
