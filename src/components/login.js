import React from 'react';
import { api } from '../services/api';
import { Form } from 'semantic-ui-react';

class LogIn extends React.Component {

    constructor(){
        super();
        this.state = {
            fields: {
                username: '',
                password: '',
            }
        }
    }
    
    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
    };
    
    handleSubmit = e => {
        api.auth.handleLogin(this.state.fields)
        .then(res => res.json())
        .then(json => {
            if(!json.error){
                localStorage.setItem('token', json.jwt);
                this.props.onLogin(json.user)
                this.props.history.push(`/users/${json.user.id}/trips`)
            } else {
                alert('Invalid username or password!');
            }
        })
    }
    
    render(){
        return(
        <>
            <h1>Treklister Login</h1>
            <Form id='loginForm' onSubmit={this.handleSubmit}>

                <Form.Group unstackable className='ui one column center aligned page grid' widths='1'>
                    <Form.Input
                        required
                        label='Username'
                        placeholder='Username'
                        name='username'
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Group unstackable className='ui one column center aligned page grid' widths='1'>
                    <Form.Input
                        required
                        type='password'
                        label='Password'
                        placeholder='Password'
                        name='password'
                        onChange={this.handleChange}
                    />
                </Form.Group>

                <Form.Button className='ui one column center aligned page grid' compact color='green' content='Login' />
            
            </Form>
        </>
        )
    }
}

export default LogIn;