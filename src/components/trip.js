import React from 'react';
import { api } from '../services/api'
import { Form } from 'semantic-ui-react';

class Trip extends React.Component {
    constructor(){
        super();
        this.state = {
            trip: null,
            beforeItem: '',
            afterItem: ''
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

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    handleBeforeSubmit = e => {

    }

    handleAfterSubmit = e => {
        
    }

    render(){
        return(
        <>
            {this.state.trip !== null ? 
                <>
                    <h1>{this.state.trip.name}</h1>
                    <h5>{this.state.trip.description !== null ? this.state.trip.description : 'No description found.'}</h5>
                    <h1>Before leaving to my destination:</h1>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            label='New Item'
                            placeholder="Don't forget to..."
                            name='beforeItem'
                            onChange={this.handleChange}
                        />
                        <Form.Button content='Submit' />
                    </Form>

                    <h1>Before leaving to go home:</h1>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input
                            label='New Item'
                            placeholder="Don't forget to..."
                            name='afterItem'
                            onChange={this.handleChange}
                        />
                        <Form.Button content='Submit' />
                    </Form>
                </>
            :
                <p>Loading...</p>
            }
            
        </>
        )
    }
}

export default Trip;