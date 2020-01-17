import React from 'react';
import { api } from '../services/api';
import { Icon, Button, Modal } from 'semantic-ui-react';
import AccountEditForm from './account_edit_form';

class Account extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            deleteModalOpen: false,
            editModalOpen: false,
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

    handleEditOpen = () => this.setState({ editModalOpen: true })

    handleEditClose = () => this.setState({ editModalOpen: false })

    handleDeleteOpen = () => this.setState({ deleteModalOpen: true })

    handleDeleteClose = () => this.setState({ deleteModalOpen: false })

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
                <p><strong>Full name:</strong> {this.state.user.first_name + ' ' + this.state.user.last_name}</p>
                <p><strong>Username:</strong> {this.state.user.username}</p>
                <Modal 
                trigger={<Button onClick={this.handleEditOpen} id={this.state.user.id} compact>Edit Account</Button>}
                open={this.state.editModalOpen}
                onClose={this.handleEditClose}
                >
                    <Modal.Header>Edit Account</Modal.Header>
                    <Modal.Content>
                        <AccountEditForm handleClose={this.handleEditClose} currUser={this.state.user}/>
                    </Modal.Content>
                </Modal>
                <Modal 
                size='mini' 
                trigger={<Button onClick={this.handleDeleteOpen} compact negative>Delete Account</Button>}
                open={this.state.deleteModalOpen}
                onClose={this.handleDeleteClose}
                >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleDeleteClose} negative>No</Button>
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