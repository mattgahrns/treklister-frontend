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
      this.state.user !== null ? 
      <Router>
        <NavMenu
        handleLogin={this.login}
        handleLogout={this.logout}
        currUser={this.state.user}
        />
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' render={props => <SignUp {...props} onLogin={this.login} />}/>
        <Route exact path='/login' render={props => <LogIn {...props} onLogin={this.login} />}/>
        <Route exact path='/users/:id/new/trip' render={props => <NewTrip {...props} />}/>
        <Route exact path='/users/:id/trips' render={props => <MyTrips {...props} />}/>
        <Route exact path='/users/:id/account' render={props => <Account {...props} />}/>
        <Route exact path='/users/:id/trips/:id' render={props => <Trip {...props} />}/>
      </Router>
      :
      <Router>
        <NavMenu
        handleLogin={this.login}
        handleLogout={this.logout}
        currUser={null}
        />
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' render={props => <SignUp {...props} onLogin={this.login} />}/>
        <Route exact path='/login' render={props => <LogIn {...props} onLogin={this.login} />}/>
      </Router>
    );
  }
}

export default App;
