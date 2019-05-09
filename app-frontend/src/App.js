import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
// import logo from './logo.svg';
import NavBar from './containers/NavBar/NavBar.js'
// import './App.css';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
