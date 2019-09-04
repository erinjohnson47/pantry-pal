import React from 'react';
import './App.css';
import Register from './Register'
import Login from './Login'
import CreatePantryItem from './CreatePantryItem';

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <CreatePantryItem />
    </div>
  );
}

export default App;
