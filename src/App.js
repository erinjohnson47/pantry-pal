import React, { Component } from 'react';
import './App.css';
import PantryContainer from './PantryContainer';
import { Route, Switch, Link } from 'react-router-dom';
// import { withRouter } from 'react-router';
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
    loggedUser: ''
  }

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
      <Switch>
        {/* <Route exact path='/' render={() => <Home />}/> */}
        <Route exact path='/pantry' render={(props) => <PantryContainer loggedUser={this.state.loggedUser}/>} />
        <Route exact path='/user/register' render = {(props) => <Register setUser={this.setUser} /> } /> 
        <Route exact path='/user/login' render ={() => <Login setUser={this.setUser} />} /> 
        <Route component={my404}/>
      </Switch>
      </div>
    )
  }
}

export default App;
