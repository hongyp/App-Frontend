import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './NavBar.css'

class NavBar extends Component {

    state = {
        auth: true
    }

    render() {

        return (
            <div className="navigation-bar" >
                <header>
                    <nav>
                        <ul className="nav-bar" >
                            <li> <NavLink to="/login"
                                exact activeClassName="active-page"
                                activeStyle={
                                    {
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }
                                } > login </NavLink>
                            </li>
                            <li > <NavLink to="/Resource"
                                exact activeClassName="active-page"
                                activeStyle={
                                    {
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }
                                } > Resource </NavLink>
                            </li>
                            <li> <NavLink to="/Project"
                                exact activeClassName="active-page"
                                activeStyle={
                                    {
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }
                                } > Project </NavLink>
                            </li>
                            <li> <NavLink to="/Formula"
                                exact activeClassName="active-page"
                                activeStyle={
                                    {
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }
                                } > Formula </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );

    }
}

export default NavBar;