import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
// import logo from './logo.svg';

import TableData from './containers/TableData/TableData.js'
// import './App.css';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <TableData />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
