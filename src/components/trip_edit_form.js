import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import { api } from '../services/api'

class TripEditForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                name: props.currTrip.name,
                description: props.currTrip.description,
            },
            trip: props.currTrip,
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    }

    handleSubmit = () => {
        api.requests.editTrip(this.state.fields, this.props.currTrip.id)
        .then(res => res.json())
        .then(json => {
            if(json.trip){
                this.props.handleClose(json.trip);
            }
        });
    }

    render(){
        return(
        <>
            <Form onSubmit={this.handleSubmit}>

                <Form.Input 
                    required
                    label='Give your trip a name: '
                    placeholder='Ex: Trip to Bahamas, Cabin Checklist, Germany 2020'
                    name='name'
                    onChange={this.handleChange}
                    defaultValue={this.props.currTrip.name}
                />

                <Form.Field
                    control={TextArea}
                    label='Description (Optional)'
                    placeholder='Say something about this trip...'
                    name='description'
                    onChange={this.handleChange}
                    defaultValue={this.props.currTrip.description}
                />

                <Form.Button compact color='green' content='Confirm' />

            </Form>
        </>
        )
    }
}

export default TripEditForm;