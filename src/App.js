import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from './services/api';
import NavMenu from './components/nav_menu';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import MyTrips from './components/mytrips';
import Account from './components/account';
import NewTrip from './components/newtrip';
import Trip from './components/trip';


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

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ user: null });
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
        <NavMenu
        handleLogin={this.login}
        handleLogout={this.logout}
        currUser={this.state.user}
        />
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' render={props => <SignUp {...props} onLogin={this.login} />}/>
        <Route exact path='/login' render={props => <LogIn {...props} onLogin={this.login} />}/>
        <Route exact path='/new/trip' render={props => <NewTrip {...props} />}/>
        <Route exact path='/user/trips' render={props => <MyTrips {...props} />}/>
        <Route exact path='/user/account' render={props => <Account {...props} />}/>
        <Route exact path='/trip/:id' render={props => <Trip {...props} />}/>
      </Router>
    );
  }
}

export default App;
