import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faSearch, faPlus, faUserCircle, faQuestionCircle, faTrash, faArrowAltCircleRight, faList } from '@fortawesome/free-solid-svg-icons'

import TableData from './containers/TableData/TableData.js'

library.add(faStroopwafel, faSearch, faPlus, faUserCircle, faQuestionCircle, faTrash, faArrowAltCircleRight, faList)

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
