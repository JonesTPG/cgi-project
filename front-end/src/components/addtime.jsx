import React, { Component } from 'react';
import axios from 'axios';

class AddTime extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: null,
            date: '',
            startTime: ''
         }
    }

    componentDidMount() {
        this.setState({id: this.props.id})    
    }

    //komponentin tulee vaihtaa näytettävä spesialisti sen mukaan,
    //minkä id:n se saa proppina
    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
        this.setState({id: this.props.id})
        }
    }

    handleDateChange = (event) => {
        this.setState({date: event.target.value});
    }

    handleStartTimeChange = (event) => {
        this.setState({startTime: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.date == '' || this.state.startTime == '') {
            alert('Tarkista että molemmissa kohdissa on oikeanlainen syöte.');
            return;
        }
        if ( !this.validateForm(this.state.date, this.state.startTime) ) {
            alert('Tarkista että molemmissa kohdissa on oikeanlainen syöte.');
            return;
        }
        //syöte kunnossa, muodostetaan dateTime-objekti ja annetaan se api:lle
        else {
            let date = this.state.date;
            let time = this.state.startTime;

            let day = date.substring(0,2);
            let month = date.substring(3,5);
            let year = date.substring(6,10);
            let hour = time.substring(0,2);
            let minutes = time.substring(3,5);

            let dateTime = new Date(year, month-1, day, hour, minutes);
            let data = {
                specialistID: this.props.id,
                date: dateTime
            }
            axios
            .post("http://localhost:3000/api/v1/timeslots", data)
            .then(() => {
              this.setState({
                infoMessage: "Arvostelu tallennettu."
              });
              this.props.updateFunction();
            });
        };
        

        
        
    }

    render() { 
        if (this.state.id == null) {
            return (
                <div>
                    <h3>ei spesialistia valittuna</h3>
                </div>
            )
        }

        else {
            return ( 
                <div>
                    <h3>Valittu spesialisti: {this.props.firstname} {this.props.lastname}</h3> 
                    <h4>lisää aika:</h4>

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Päivämäärä: (pp/kk/vvvv)
                        <input type="text" value={this.state.date} onChange={this.handleDateChange} />
                        </label>

                        <label>
                            Kellonaika: (hh:mm)
                        <input type="text" value={this.state.startTime} onChange={this.handleStartTimeChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
             );
        }
        
    }

    validateForm(date, time) {
        let dateRe = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
        let timeRe = /^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        
        if (dateRe.test(date) && timeRe.test(time)) {
            return true;
        }
        return false;

    }
}
 
export default AddTime;