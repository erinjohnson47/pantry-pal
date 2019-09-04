import React from 'react';
import './App.css';
import Register from './Register'
import Login from './Login'
import PantryContainer from './PantryContainer';

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <PantryContainer />
    </div>
  );
}

export default App;
