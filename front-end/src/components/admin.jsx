import React, { Component } from 'react';
import axios from 'axios';
import Specialist from './specialist';
import AddTime from './addtime';

class Admin extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            specialists: null,
            selected: {}
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
    updateSelected = (specialist) => {
        
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
            
                <h2 className="center">Lisää aika spesialistille</h2>
    
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

                    <div className="col l6">
                        <AddTime 
                            id={this.state.selected.id}
                            firstname={this.state.selected.firstname}
                            lastname={this.state.selected.lastname}
                        />
                    </div>
                        
                    

                </div>
    
            </div>
            );
        }
  
    }
}
 
export default Admin;