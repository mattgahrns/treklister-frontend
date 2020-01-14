import React from 'react';
import { api } from '../services/api';
import { Form, TextArea } from 'semantic-ui-react';

class NewTrip extends React.Component {

    constructor(){
        super();
        this.state = {
            fields: {
                name: '',
                description: ''
            },
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

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    handleSubmit = e => {
        e.preventDefault();
        api.requests.newTrip(this.state.fields, this.state.user)
        .then(this.props.history.push('/user/trips'));
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
                    name='description'
                    onChange={this.handleChange}
                />

                <Form.Button content='Submit' />
            
            </Form>
            
        </>
        )
    }
}

export default NewTrip;