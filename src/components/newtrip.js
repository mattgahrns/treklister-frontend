import React from 'react';
import { api } from '../services/api';
import { Form, TextArea } from 'semantic-ui-react';

class NewTrip extends React.Component {

    constructor(){
        super();
        this.state = {
            fields: {
                name: ''
            }
        }
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    handleSubmit = e => {
        e.preventDefault();
        api.rails.newTrip(this.state.fields, this.props.currUser)
        .then(res => res.json())
        .then(console.log);
    }

    render(){
        return(
        <>
            <h1>New Trip</h1>
            <Form onSubmit={this.handleSubmit}>

                <Form.Input 
                    required
                    label='Give your trip a name: '
                    placeholder='Ex: Trip to Bahamas, Cabin Checklist, Germany 2020'
                    name='name'
                    onChange={this.handleChange}
                />

                <Form.Field
                    control={TextArea}
                    label='Description (Optional)'
                    placeholder='Say something about this trip...'
                />

                <Form.Button content='Submit' />
            
            </Form>
            
        </>
        )
    }
}

export default NewTrip;