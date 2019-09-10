import React, { Component } from 'react';
import './App.css';
import PantryContainer from './PantryContainer';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './Home';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';

const baseUrl = "http://localhost:9000/"

const my404 = () => {
  return (
    <div>
      Uh oh, you seem lost, <a href='/pantry'>click here to go home!</a>
    </div>
  )
}

class App extends Component {
  state = {
    allPantryItems: [],
    filteredItems: [],
    activeItem: '',
    loggedUser: ''
  }
  //activeItem state lifted from NavBar
  handleItemClick = (e) => {
    this.setState({ 
        activeItem: e.target.innerText 
    },()=>{this.filterItems(this.state.activeItem)})
    console.log(this.state.activeItem, "this is activeItem in app.js")
  }
  

  filterItems = (activeItem) => {
    //use activeItem to determine which item should be filtered to list
    if (activeItem === 'Refrigerator') {
        //filters for items in Refrigerator only
        const fridgeFilter = [...this.state.allPantryItems].filter(item => item.location === "Refrigerator");
        console.log(fridgeFilter, 'fridgeFilder in filteritems')
        this.setState({
            filteredItems: fridgeFilter,
            activeItem: "Refrigerator"
        })
    } else if (activeItem === 'Freezer') {
        //filters for items in Freezer only
        const freezerFilter = [...this.state.allPantryItems].filter(item => item.location === "Freezer") 
        console.log(freezerFilter, 'freezerFilter in filteritems')
        this.setState({
            filteredItems: freezerFilter,
            activeItem: "Freezer"
        })
    } else {
        //filters for items in Pantry only
        const pantryFilter = [...this.state.allPantryItems].filter(item => item.location === "Pantry")
        console.log(pantryFilter, 'pantryFilter in filteritems')
        this.setState({
            filteredItems: pantryFilter,
            activeItem: "Pantry"
        })
    }
}
getPantryItems = async () => {
    try {
        const responseGetPantryItems = await fetch(`${baseUrl}pantry`, {
            credentials: 'include',
            method: 'GET'
        })

        if(responseGetPantryItems.status !== 200) {
            throw Error('404 from server')
        }
        const jsonPantryItems = await responseGetPantryItems.json();
        console.log(jsonPantryItems, 'jsonPantryItems in getPantryItems App.js')
        this.setState({
            allPantryItems: [...jsonPantryItems.data]
        });
    } catch (err) {
        console.log(err, 'getPantryItems error')
        return err
    }
}

  //setUser state lifted from Login/Register
  setUser = (user) => {
    this.setState({
      loggedUser: user
    })
    localStorage.setItem("pantryUser", this.state.loggedUser)
  }
  render() {
    return (
      <div className="App">
      <NavBar handleItemClick={this.handleItemClick} activeItem={this.state.activeItem}/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/pantry' component={() => 
          <PantryContainer 
            getPantryItems={this.getPantryItems}
            loggedUser={this.state.loggedUser}
            handleItemClick={this.handleItemClick}
            allPantryItems={this.state.allPantryItems} 
            filteredItems={this.state.filteredItems} 
            activeItem={this.state.activeItem}/>} />
        <Route 
          exact path='/user/register' 
          component={() => <Register 
            setUser={this.setUser} /> } /> 
        <Route 
          exact path='/user/login' 
          component={() => <Login 
            setUser={this.setUser} 
            getPantryItems={this.getPantryItems}/>} /> 
        <Route render={my404}/>
      </Switch>
      </div>
    )
  }
}

export default withRouter(App);
