import React, { Component } from 'react';
import axios from 'axios';

class AddAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: null,
            date: '',
            startTime: '',
            timeslots: [],
            filterStart: new Date(2019,0,1,8,15),
            filterEnd: new Date(2020,1,1,8,15),
            message: ''
         }
    }
    //komponentin tulee vaihtaa näytettävä spesialisti sen mukaan,
    //minkä id:n se saa proppina
    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
        

        let url = 'http://localhost:8080/api/v1/timeslots/free?from='
        + this.state.filterStart.toJSON() + '&to=' + this.state.filterEnd.toJSON() + '&specialists='
        + this.props.id;


        axios.get(url).then((response)=> {
            this.setState({
                id: this.props.id,
                timeslots: JSON.parse(response.data)
            });
            return;
          });
    
        }
    }

    handleClick = (id) => {
        console.log("varataan aika" + id);
        axios.put('http://localhost:8080/api/v1/timeslots/'+id).then((response)=> {
            
            let url = 'http://localhost:8080/api/v1/timeslots/free?from='
            + this.state.filterStart.toJSON() + '&to=' + this.state.filterEnd.toJSON() + '&specialists='
            + this.props.id;

            //jos put-request onnistui, haetaan kannasta jäljellä olevat vapaat ajat.
            axios.get(url).then((response)=> {
                this.setState({
                    id: this.props.id,
                    timeslots: JSON.parse(response.data),
                    message: response.data.message
                });
                return;
            });
            return;
          });
    }

    render() { 
        if (this.state.id == null) {
            return (
                <div>
                    <h3>ei spesialistia valittuna</h3>
                </div>
            )
        }

        else if (this.state.timeslots.length === 0) {
            return (
                <div>
                    <h3>Tällä spesialistilla ei ole vapaita aikoja.</h3>
                </div>
            )
        }

        else {
            return ( 
                <div>
                    <h3>Valittu spesialisti: {this.props.firstname} {this.props.lastname}</h3> 
                    <h4>Vapaat ajat:</h4>
                    {
                        this.state.timeslots.map(timeslot => (
                            
                            <div key={timeslot._id}>
                                <p>ajankohta: {timeslot.startTime} - {timeslot.endTime}</p>
                                <p>id: {timeslot._id}</p>
                                <button className="waves-effect blue darken-1 btn white-text"
                                        onClick={() => this.handleClick(timeslot._id)}>
                                        Varaa
                                </button>
                                
                            </div>
                            )
                        )
                    }
                </div>
             );
        }   
    }
}
 
export default AddAppointment;