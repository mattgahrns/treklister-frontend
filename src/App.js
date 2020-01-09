import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavMenu from './components/nav_menu';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    }
  }
  
  render(){
    return (
      <Router>
        <NavMenu />
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/login' component={LogIn}/>
      </Router>
    );
  }
}

export default App;
