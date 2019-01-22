import React, { Component } from 'react';

class Specialist extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <li className="collection-item avatar white">
                {/* <p>Etunimi: {this.props.firstname}</p>
                <p>Sukunimi: {this.props.lastname}</p>
                <p>Titteli: {this.props.role}</p> */}

                    <div className="row">

                    <div className="col l3">
                        
                    </div>
                    <div className="col l9">
                        <span className="title black-text">Nimi: {this.props.firstname}</span>
                        <p className="black-text">Sukunimi: {this.props.lastname} </p>
                        <p className="black-text">Titteli: {this.props.role} </p>  
                      
                        
                        <button className="waves-effect blue darken-1 btn white-text">Valitse</button>
                    
                    </div>
                    </div>
                </li>
            </div>

          );
    }
}
 
export default Specialist;