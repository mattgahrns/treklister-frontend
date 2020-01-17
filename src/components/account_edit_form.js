import React from 'react';
import { Form } from 'semantic-ui-react';
import { api } from '../services/api'

class AccountEditForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                first_name: props.currUser.first_name,
                last_name: props.currUser.last_name,
                username: props.currUser.username,
            }
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    }

    handleSubmit = () => {
        api.requests.handleAccountEdit(this.state.fields, this.props.currUser.id)
        .then(res => res.json())
        .then(json => {
            const newFields = { ...this.state.fields, first_name: json.user.first_name, last_name: json.user.last_name, username: json.user.username };
            this.setState({ fields: newFields });
            this.props.handleClose(json.user);
        });
    }

    render(){
        return(
        <>
            <Form onSubmit={this.handleSubmit}>

                <Form.Group unstackable widths='1'>
                    <Form.Input 
                        required
                        label='Username'
                        placeholder='Username'
                        name='username'
                        onChange={this.handleChange}
                        defaultValue={this.props.currUser.username}
                    />
                </Form.Group>

                <Form.Group unstackable widths='2'>
                    <Form.Input 
                        required
                        label='First name'
                        placeholder='First name'
                        name='first_name'
                        onChange={this.handleChange}
                        defaultValue={this.props.currUser.first_name}
                    />
                    <Form.Input
                        required
                        label='Last name'
                        placeholder='Last name'
                        name='last_name'
                        onChange={this.handleChange}
                        defaultValue={this.props.currUser.last_name}
                    />
                </Form.Group>

                <Form.Button content='Submit' />
                
            </Form>
        </>
        )
    }
}

export default AccountEditForm;