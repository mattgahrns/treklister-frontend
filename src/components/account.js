import React from 'react';
import { api } from '../services/api';

class Account extends React.Component {

    constructor(props){
        super(props);
        this.state = {
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

    render(){
        return(
        <>
            {this.state.user !== null ? 
            <>
                <h1>Hello, {this.state.user.first_name}!</h1>
                <h3>Account Details: </h3>
                <p>Full name: {this.state.user.first_name + ' ' + this.state.user.last_name}</p>
                <p>Username: {this.state.user.username}</p>
            </>
            :
                null
            }
            
        </>
        )
    }
}

export default Account;