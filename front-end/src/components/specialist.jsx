import React, { Component } from 'react';

class Specialist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }

         
    }

    handleClick = (id) => {
       
    }

    render() { 

        let specialist = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            id: this.props.id,
            role: this.props.role
        }

        return (
            <div>
                <div className="center">
            
                    <span className="title black-text">Nimi: {this.props.firstname}</span>
                    <p className="black-text">Sukunimi: {this.props.lastname} </p>
                    <p className="black-text">Titteli: {this.props.role} </p> 
                    <p className="black-text">Id: {this.props.id} </p>    
                    <button className="waves-effect blue darken-1 btn white-text"
                            onClick={() => this.props.setId(specialist)}>
                            Valitse</button>
                </div>
            </div>

          );
    }
}
 
export default Specialist;