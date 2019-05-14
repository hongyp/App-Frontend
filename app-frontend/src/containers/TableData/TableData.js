import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar';

import Aux from '../../hoc/Aux.js'

import './TableData.css'
import HeaderPart from '../../components/Headers/Headers.js'
import ResourcePage from '../../components/Resource/Resource.js'
import ProjectPage from '../../components/Project/Project.js'
import FormulaPage from '../../components/Formula/Formula.js'
import LoginPage from '../../components/Login/Login.js'
import SignupPage from '../../components/Signup/Signup.js'

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
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }
        this.setState({
            showSideBar: !showSideBar
        });
    }

    render() {

        return (
            <Aux>
                <div className="header">
                    <HeaderPart />
                </div>
                <div id="mySidebar" className="sidebar">
                    <NavBar />
                </div>
                <div id="main">
                    <button className="openbtn" onClick={this.showNav}>&#9776;</button>
                    <Switch>
                        {/* {this.state.auth ? < Route path="/Resource" component={ResourcePage} /> : null} */}
                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/resource" component={ResourcePage} />
                        <Route path="/project" component={ProjectPage} />
                        <Route path="/formula" component={FormulaPage} />
                        <Route render={() => <h1> Not found!!! </h1>} />
                    </Switch>
                </div>
            </Aux>
        );
    }

}

export default TableData;