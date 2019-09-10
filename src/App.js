import React, { Component } from 'react';
import './App.css';
import PantryContainer from './PantryContainer';
import { Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './Home';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';

const baseUrl = process.env.REACT_APP_BACKEND_URL

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

  componentDidMount(){
    //adds user to local storage
    const user = JSON.parse(localStorage.getItem("pantryUser"))
    //if the page is refreshed while user is logged in re-save current user to state and then getPantryItems for that user again
    if (user){
      this.setState({
        loggedUser: user
      },()=>{
        this.getPantryItems()
      })
    }
  }
  //activeItem state lifted from NavBar
  handleItemClick = (e) => {
    this.setState({ 
        activeItem: e.target.innerText 
    },()=>{this.filterItems(this.state.activeItem)})
    this.props.history.push('/pantry')
  }
  
  //logout route
  //clear local storage, clear session, clear state
  handleLogoutClick = (e) => {
    localStorage.clear();
    this.setState({
      allPantryItems: [],
      filteredItems: [],
      activeItem: '',
      loggedUser: ''
    })
    this.props.history.push('/pantry');
  }

  filterItems = (activeItem) => {
    //use activeItem to determine which item should be filtered to list
    if (activeItem === 'Refrigerator') {
        //filters for items in Refrigerator only
        const fridgeFilter = [...this.state.allPantryItems].filter(item => item.location === "Refrigerator");
        this.setState({
            filteredItems: fridgeFilter,
            activeItem: "Refrigerator"
        })
    } else if (activeItem === 'Freezer') {
        //filters for items in Freezer only
        const freezerFilter = [...this.state.allPantryItems].filter(item => item.location === "Freezer") 
        this.setState({
            filteredItems: freezerFilter,
            activeItem: "Freezer"
        })
    } else {
        //filters for items in Pantry only
        const pantryFilter = [...this.state.allPantryItems].filter(item => item.location === "Pantry")
        this.setState({
            filteredItems: pantryFilter,
            activeItem: "Pantry"
        })
    }
}
getPantryItems = async () => {
    try {
        const responseGetPantryItems = await fetch(`${baseUrl}/pantry`, {
            credentials: 'include',
            method: 'GET'
        })

        if(responseGetPantryItems.status !== 200) {
            throw Error('404 from server')
        }
        const jsonPantryItems = await responseGetPantryItems.json();
        this.setState({
            allPantryItems: [...jsonPantryItems.data]
        });
    } catch (err) {
        return err
    }
}

  //setUser state lifted from Login/Register
  setUser = (user) => {
    localStorage.setItem("pantryUser", JSON.stringify(user))
    this.setState({
      loggedUser: user
    })
  }
  render() {
    return (
      <div className="App">
      <NavBar handleLogoutClick={this.handleLogoutClick} handleItemClick={this.handleItemClick} activeItem={this.state.activeItem}/>
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
