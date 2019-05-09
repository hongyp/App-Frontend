import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import './NavBar.css'
import logo from '../../logo.svg';

import ResourcePage from '../Resource/Resource.js'
import ProjectPage from '../Project/Project.js'
import FormulaPage from '../Formula/Formula.js'

class NavBar extends Component {

    state = {
        auth:true,
        showNavBar:true
    }

    toggleNavBar = () => {
        const toggleNavBar = this.state.showNavBar;
        this.setState({
            showNavBar:!toggleNavBar
        })
    }

    render() {

        let navbar = null;
        if (this.state.showNavBar) {
            navbar = (
                (
                    <header>
                        <nav>
                            <ul className = "nav-bar" >
                                <li > <NavLink to = "/Resource"
                                        exact activeClassName = "active-page"
                                        activeStyle = {
                                            {
                                                color: '#fa923f',
                                                textDecoration: 'underline'
                                            }
                                        } > Resource </NavLink> 
                                </li> 
                                <li> <NavLink to = "/Project"
                                        exact activeClassName = "active-page"
                                        activeStyle = {
                                            {
                                                color: '#fa923f',
                                                textDecoration: 'underline'
                                            }
                                        } > Project </NavLink> 
                                </li> 
                                <li> <NavLink to = "/Formula"
                                        exact activeClassName = "active-page"
                                        activeStyle = {
                                            {
                                                color: '#fa923f',
                                                textDecoration: 'underline'
                                            }
                                        } > Formula </NavLink> 
                                </li> 
                            </ul> 
                        </nav> 
                    </header>
                )
            )
        } else {
            navbar = null;
        }

        return ( 
        <div className = "cols" >
            <div id = "left" className = "navigation-bar column" >
                <div className = "top-left top" >
                    <img src = { logo } className = "App-logo" alt = "logo" />
                </div> 
                <div className = "bottom" >
                    {navbar}
                </div> 
            </div> 
            <div id = "right" className = "column" >
                <div className = "top-right top" >
                    Top right
                </div> 
                <div className = "bottom" >
                    <button onClick={this.toggleNavBar}>Toggle</button>
                    <Switch> 
                        {this.state.auth ? < Route path = "/Resource"component = { ResourcePage }/> : null} 
                        <Route path = "/Resource" component = { ResourcePage }/> 
                        <Route path = "/Project" component = { ProjectPage }/> 
                        <Route path = "/Formula" component = { FormulaPage }/> 
                        <Route render = {() => <h1> Not found!!! </h1>} />
                    </Switch> 
                </div> 
            </div>
        </div>
        );
    }
}

export default NavBar;