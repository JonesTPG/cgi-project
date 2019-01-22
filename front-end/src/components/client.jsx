import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Specialist from './specialist';


//react-sovelluksen pääkomponentti. pidetään state reactin best practicen mukaisesti mahdollisimman ylhäällä.
class Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      specialists: null
    };

  }

  //haetaan spesialistit apista
  componentDidMount() {
      axios.get('http://localhost:3000/api/v1/specialists/all').then((response)=> {
        this.setState({
          specialists: JSON.parse(response.data)
        })
        return;
      });

  }

  //funktio, joka annetaan proppina specialistille. tämän avulla pidetään kirjaa, minkä
  //spesialistin käyttäjä on valinnut
  updateSelected = (id) => {
    console.log("selected:" + id)
    this.setState({selected: id})
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
        <div className="client-main">
        
          <h2 className="center">Varaa aika spesialistilta</h2>
          <div className="row">
                    <div className="col l6">
          {
              this.state.specialists.map(specialist => (
                <Specialist 
                  firstname={specialist.firstname}
                  lastname={specialist.lastname}
                  role={specialist.role}
                  id={specialist._id}
                  setId={this.updateSelected}
                  key={specialist._id}
                />

              )
                )
          }
          </div>
          <p>varaa aika</p>
          </div>

        </div>
      );
    }
  }
}

export default Client;
