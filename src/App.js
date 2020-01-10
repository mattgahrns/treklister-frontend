import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavMenu from './components/nav_menu';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import { api } from './services/api'

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user: null
    }
  }

  login = (data) => {
    this.setState({
      user: data
    })
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
    return (
      <Router>
        <NavMenu handleLogin={this.login}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' render={props => <SignUp {...props} onLogin={this.login} />}/>
        <Route exact path='/login' component={LogIn}/>
      </Router>
    );
  }
}

export default App;
