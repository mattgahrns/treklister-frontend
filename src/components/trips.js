import React from 'react';
import { api } from '../services/api';

class Trips extends React.Component {

    constructor(){
        super();
        this.state = {
            trips: null,
            user: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null)
        api.auth.getCurrentUser().then((data) => {
          if (!data.error) {
            this.setState({
              user: data
            }, () => this.fetchTrips())
          } else {
            this.setState({
              user: null
            })
          }
        })
    }

    fetchTrips = () => {
        api.req.fetchTrips(this.state.user)
        .then(res => res.json())
        .then(json => {
            this.setState({
                trips: json
            });
        });
    }

    renderTrips = () => {
        return this.state.trips.map(trip => {
            return <p key={trip.id}>{trip.name} aaa</p>
        });
    }

    render(){
        return(
            <>
                <h1>Your Trips</h1>
                {this.state.trips !== null ? 
                    this.renderTrips()
                :
                    <p>Loading...</p>
                }
            </>
        )
    }
}

export default Trips;