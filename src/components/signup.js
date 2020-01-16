import React from 'react';
import { api } from '../services/api';
import { Form } from 'semantic-ui-react';

class SignUp extends React.Component {

    constructor(){
        super();
        this.state = {
            fields: {
                first_name: '',
                last_name: '',
                username: '',
                password: '',
            },
            password2: ''
        }
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };

    handleChangeConfirmPassword = e => {
        this.setState({ password2: e.target.value })
    }

    handleSubmit = () => {
        if(this.state.fields.password === this.state.password2){
            api.auth.handleSignUp(this.state.fields)
            .then(res => res.json())
            .then(json => {
                if(!json.error){
                    localStorage.setItem('token', json.jwt);
                    this.props.onLogin(json.user)
                    this.props.history.push('/')
                }else{
                    alert(json.error);
                }
            })
        } else {
           alert('Passwords do not match');
        }
    }

    render(){
        return(
        <>
            <h1>Treklister Sign Up</h1>

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

                <Form.Group unstackable widths='2'>
                    <Form.Input
                        required
                        type='password'
                        label='Password'
                        placeholder='Password'
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

export default SignUp;