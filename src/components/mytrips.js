import React from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

class MyTrips extends React.Component {

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
        api.requests.fetchTrips(this.state.user)
        .then(res => res.json())
        .then(json => {
            this.setState({
                trips: json
            });
        });
    }

    renderTrips = () => {
        return this.state.trips.map(trip => {
            return <div key={trip.id}><Link className='tripLinks' to={`/users/${this.state.user.id}/trips/${trip.id}`} key={trip.id}>{trip.name}</Link><br/><br/></div>
        });
    }

    render(){
        return(
            <>
                <h1>Your Trips</h1>
                <br/>
                {this.state.trips !== null ? 
                    this.renderTrips().length === 0 ? 
                    <p>You don't have any trips yet!</p>
                    :
                    <div className='flex-container'>
                    {this.renderTrips()}
                    </div>
                :
                    <Icon id='loadingIcon' loading name='spinner' size='massive'/>
                }
            </>
        )
    }
}

export default MyTrips;