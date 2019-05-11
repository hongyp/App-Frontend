import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

// import logo from './logo.svg';

import TableData from './containers/TableData/TableData.js'
// import './App.css';

class App extends Component {

  state = {
    auth: true
  }
  render () {

    let page = null;

    if (this.state.auth) {
      page = (
        <div className="App">
          <TableData />
        </div>
      )
    } else {
      page = null;
    }

    return (
      <BrowserRouter>
        {page}
      </BrowserRouter>
    )
  }
}

export default App;
