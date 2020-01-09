import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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

        <Menu.Item
          as={ Link } to='/signup'
          name='signup'
          active={activeItem === 'signup'}
          onClick={this.handleItemClick}
        >
          Sign Up
        </Menu.Item>

        <Menu.Item 
          as={ Link } to='/login'
          position='right'
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        >
          Login
        </Menu.Item>

      </Menu>
    )
  }
}

export default NavMenu;