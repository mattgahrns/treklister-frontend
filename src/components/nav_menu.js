import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavMenu extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='massive'>

        <Menu.Item header>Treklister</Menu.Item>

        <Menu.Item
          as={ Link } to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        {this.props.currUser !== null ?
        <>
        <Menu.Item
          as={ Link } to={`/users/${this.props.currUser.id}/new/trip`}
          name='newtrip'
          active={activeItem === 'newtrip'}
          onClick={this.handleItemClick}
        >
          New Trip
        </Menu.Item>

        <Menu.Item
          as={ Link } to={`/users/${this.props.currUser.id}/trips`}
          name='trips'
          active={activeItem === 'trips'}
          onClick={this.handleItemClick}
        >
          {this.props.currUser.first_name}'s Trips
        </Menu.Item>
        
        <Menu.Item
          as={ Link } to={`/users/${this.props.currUser.id}/account`}
          name='account'
          active={activeItem === 'account'}
          onClick={this.handleItemClick}
        >
          {this.props.currUser.first_name}'s Account
        </Menu.Item>

        </>
        :

        <Menu.Item
          as={ Link } to='/signup'
          name='signup'
          active={activeItem === 'signup'}
          onClick={this.handleItemClick}
        >
          Sign Up
        </Menu.Item>
        }
      
        {this.props.currUser !== null ? 
        <Menu.Item 
          as={ Link } to='/login'
          position='right'
          name='logout'
          active={activeItem === 'logout'}
          onClick={() => {
            this.props.handleLogout();
          }}
        >
          Logout
        </Menu.Item>
        :
        <Menu.Item 
          as={ Link } to='/login'
          position='right'
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        >
          Login
        </Menu.Item>
        }
        

      </Menu>
    )
  }
}

export default NavMenu;