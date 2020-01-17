import React from 'react';
import { api } from '../services/api';
import { Icon, Button, Modal, Header } from 'semantic-ui-react';

class Account extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            modalOpen: false,
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

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleEdit = (e) => {
        console.log(e.target.id);
    }

    handleDelete = (e) => {
        api.requests.deleteUser(e.target.id)
        .then(res => res.json())
        .then(json => {
            alert(json.message);
            this.props.history.push('/signup');
        });
    }

    render(){
        return(
        <>
            {this.state.user !== null ? 
            <>
                <h1>Hello, {this.state.user.first_name}!</h1>
                <h3>Account Details: </h3>
                <p>Full name: {this.state.user.first_name + ' ' + this.state.user.last_name}</p>
                <p>Username: {this.state.user.username}</p>
                <Modal trigger={<Button id={this.state.user.id} compact>Edit Account</Button>}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                        </p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                <Modal 
                size='mini' 
                trigger={<Button onClick={this.handleOpen} compact negative>Delete Account</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose} negative>No</Button>
                        <Button
                        id={this.state.user.id}
                        onClick={(e) => this.handleDelete(e)}
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
            </>
            :
                <Icon loading name='spinner' size='massive'/>
            }
            
        </>
        )
    }
}

export default Account;