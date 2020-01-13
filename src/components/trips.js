import React from 'react';
import { api } from '../services/api';

class Trips extends React.Component {

    constructor(){
        super();
        this.state = {
            trips: [],
            user: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem("token") != null)
        api.auth.getCurrentUser().then((data) => {
          if (!data.error) {
            this.setState({
              user: data
            })
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
        .then(json => console.log(json.trips));
    }

    render(){
        return(
            <>
                <h1>Your Trips</h1>
                {this.state.user !== null ? 
                    this.fetchTrips()
                :
                    null
                }
            </>
        )
    }
}

export default Trips;