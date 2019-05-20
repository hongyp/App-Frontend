import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faSearch, faPlus, faUserCircle, 
      faQuestionCircle, faTrash, faArrowAltCircleRight, faList, faCheck } 
      from '@fortawesome/free-solid-svg-icons'

import  { history } from './_helpers/history'
import { alertActions } from './_actions/alert.actions'
// import { PrivateRoute } from './_components/PrivateRoute'
import TableData from './containers/TableData/TableData.js'
import LoginPage from './components/Login/Login'
import RegisterPage from './components/Signup/Signup'

library.add(faStroopwafel, faSearch, faPlus, faUserCircle, 
  faQuestionCircle, faTrash, faArrowAltCircleRight, faList, faCheck)

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    })
  }

  render () {
    // const { alert } = this.props;
    return (
      <BrowserRouter>
        {/* <div className="App"> */}
          {/* <TableData /> */}
        {/* </div> */}

            {/* {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            } */}
          <Router history={history}>
            <div>
                {/* <PrivateRoute exact path="/" component={LoginPage} /> */}
                <Route path="/login" component={LoginPage} />
                <Route path="/table" component={TableData} />
                <Route path="/signup" component={RegisterPage} />
            </div>
        </Router>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}
const connectedApp = connect(mapStateToProps)(App);
// export { connectedApp as App }; 
export default connectedApp;
