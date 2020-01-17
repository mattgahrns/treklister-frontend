import React from 'react';
import { Form } from 'semantic-ui-react';
import { api } from '../services/api'

class AccountEditForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {
                first_name: '',
                last_name: '',
                username: '',
            }
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    }

    handleSubmit = (e) => {
        api.requests.updateListItem(this.state.item.id, this.state.fields)
        .then(res => res.json())
        .then(json => {
            this.props.handleClose();
        });
    }

    handleSubmit = () => {
        api.requests.handleAccountEdit(this.state.fields, this.props.currUser.id)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.props.handleClose();
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
                    />
                </Form.Group>

                <Form.Group unstackable widths='2'>
                    <Form.Input 
                        required
                        label='First name'
                        placeholder='First name'
                        name='first_name'
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        required
                        label='Last name'
                        placeholder='Last name'
                        name='last_name'
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Button content='Submit' />
                
            </Form>
        </>
        )
    }
}

export default AccountEditForm;