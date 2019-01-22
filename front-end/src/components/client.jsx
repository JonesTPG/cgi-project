import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Specialist from './specialist';
import AddAppointment from './addappointment';


//react-sovelluksen pääkomponentti. pidetään state reactin best practicen mukaisesti mahdollisimman ylhäällä.
class Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      specialists: null,
      selected: {}
    };

  }

  //haetaan spesialistit apista
  componentDidMount() {
      axios.get('http://localhost:8080/api/v1/specialists/all').then((response)=> {
        this.setState({
          specialists: JSON.parse(response.data)
        })
        return;
      });

  }

  //funktio, joka annetaan proppina specialistille. tämän avulla pidetään kirjaa, minkä
  //spesialistin käyttäjä on valinnut
  updateSelected = (specialist) => {
    console.log("selected:" + specialist.id)
    this.setState({selected: specialist})
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
          <AddAppointment 
             id={this.state.selected.id}
             firstname={this.state.selected.firstname}
             lastname={this.state.selected.lastname}
          />
          </div>

        </div>
      );
    }
  }
}

export default Client;
