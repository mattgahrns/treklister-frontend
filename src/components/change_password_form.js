import React from 'react';
import { Form } from 'semantic-ui-react';
import { api } from '../services/api'

class ChangePasswordForm extends React.Component{
    constructor(){
        super();
        this.state = {
            fields: {
                password: ''
            },
            password2: '',
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    }

    handleChangeConfirmPassword = e => {
        this.setState({ password2: e.target.value })
    }

    handleSubmit = () => {
        if(this.state.fields.password === this.state.password2){
            api.requests.handlePasswordChange(this.state.fields, this.props.currUser.id)
            .then(res => res.json())
            .then(json => {
                alert(json.message);
                this.props.handleClose();
            });
        } else {
            alert('Passwords do not match!');
        }
    }

    render(){
        return(
        <>
            <Form onSubmit={this.handleSubmit}>

                <Form.Group unstackable widths='2'>
                    <Form.Input
                        required
                        type='password'
                        label='New password'
                        placeholder='New password'
                        name='password'
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        required
                        type='password'
                        label='Confirm password'
                        placeholder='Confirm password'
                        name='password2'
                        onChange={this.handleChangeConfirmPassword}
                    />
                </Form.Group>

                <Form.Button content='Submit' />
                
            </Form>
        </>
        )
    }
}

export default ChangePasswordForm;