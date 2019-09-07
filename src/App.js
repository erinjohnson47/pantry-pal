import React, { Component } from 'react';
import './App.css';
import PantryContainer from './PantryContainer';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './Home';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';

const my404 = () => {
  return (
    <div>
      Uh oh, you seem lost, <a href='/pantry'>click here to go home!</a>
    </div>
  )
}

class App extends Component {
  state = {
    activeItem: '',
    loggedUser: ''
  }
  //activeItem state lifted from NavBar
  handleItemClick = (e) => {
    this.setState({ 
        activeItem: e.target.innerText 
    })
    console.log(this.state.activeItem)
  }
  //setUser state lifted from Login/Register
  setUser = (user) => {
    this.setState({
      loggedUser: user
    })
  }
  render() {
    console.log(this.state.loggedUser, 'loggedUser in App.js')
    console.log(this.state.loggedUser.userId, 'loggedUser.userId in App.js')
    return (
      <div className="App">
      <NavBar handleItemClick={this.handleItemClick} activeItem={this.state.activeItem}/>
      <Switch>
        <Route exact path='/' render={() => <Home />}/>
        <Route exact path='/pantry' render={(props) => <PantryContainer loggedUser={this.state.loggedUser}/>} />
        <Route exact path='/user/register' render={(props) => <Register setUser={this.setUser} /> } /> 
        <Route exact path='/user/login' render ={() => <Login setUser={this.setUser} />} /> 
        <Route component={my404}/>
      </Switch>
      </div>
    )
  }
}

export default withRouter(App);
