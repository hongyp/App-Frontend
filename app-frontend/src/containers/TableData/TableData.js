import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
// import history from '../../_helpers/history'

import Aux from '../../hoc/Aux.js'

import './TableData.css'
import HeaderPart from '../../components/Header/Header.js'
import ResourcePage from '../../components/Resource/Resource.js'
import ProjectPage from '../../components/Project/Project.js'
import FormulaPage from '../../components/Formula/Formula.js'
import EditPage from '../../components/Formula/Edit/Edit'

class TableData extends Component {

    state = {
        auth: true,
        showSideBar: false
    }

    showNav = () => {
        const showSideBar = this.state.showSideBar;
        if (showSideBar) {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        } else {
            document.getElementById("mySidebar").style.width = "20%";
            document.getElementById("main").style.marginLeft = "20%";
        }
        this.setState({
            showSideBar: !showSideBar
        });
    }

    render() {
        const base = this.props.match.url
        return (
            <Aux>
                <div className="header">
                    <HeaderPart />
                </div>
                <div id="mySidebar" className="sidebar">
                    <NavBar base={base} />
                </div>
                <div id="main">
                    <button className="openbtn" onClick={this.showNav}>&#9776;</button>
                    <Switch>
                        {/* {this.state.auth ? < Route path="/Resource" component={ResourcePage} /> : null} */}
                        {/* <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignupPage} /> */}
                        <Route path={base+"/resource"} component={ResourcePage} />
                        <Route path={base+"/project"} component={ProjectPage} />
                        <Route path={base+"/formula"} component={FormulaPage} />
                        <Route path={base+"/edit"} component={EditPage} />
                        <Redirect from={base} to='/table/resource'></Redirect>
                        <Route render={() => <h1> Not found!!! </h1>} />
                        {/* <Redirect to='/resource' /> */}
                    </Switch>
                </div>
            </Aux>
        );
    }

}

export default TableData;