import React from 'react';
import { api } from '../services/api'

class Trip extends React.Component {
    constructor(){
        super();
        this.state = {
            trip: null
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        // console.log(params.id)
        api.requests.fetchTrip(params.id)
        .then(res => res.json())
        .then(json => {
            this.setState({
                trip: json
            })
        });
    }

    render(){
        return(
        <>
            {this.state.trip !== null ? 
                <>
                    <h1>{this.state.trip.name}</h1>
                    <h5>{this.state.trip.description !== null ? this.state.trip.description : 'No description found.'}</h5>
                </>
            :
                <p>Loading...</p>
            }
            
        </>
        )
    }
}

export default Trip;