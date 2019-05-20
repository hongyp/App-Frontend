import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import './NavBar.css'

class NavBar extends Component {

    state = {
        auth: true
    }

    render() {

        const style = {
            color: '#fa923f',
            textDecoration: 'underline'
        }

        return (
            <div className="navigation-bar" >
                <header>
                    <nav>
                        <ul className="nav-bar" >
                            {/* <li> <NavLink to="/login"
                                exact activeClassName="active-page"
                                activeStyle={ style } > login </NavLink>
                            </li>
                            <li> <NavLink to="/signup"
                                exact activeClassName="active-page"
                                activeStyle={ style }> Singup </NavLink>
                            </li> */}
                            <li > <NavLink to={this.props.base+"/resource"}
                                exact activeClassName="active-page"
                                activeStyle={ style } > Resource </NavLink>
                            </li>
                            <li> <NavLink to={this.props.base+"/project"}
                                exact activeClassName="active-page"
                                activeStyle={ style } > Project </NavLink>
                            </li>
                            <li> <NavLink to={this.props.base+"/formula"}
                                exact activeClassName="active-page"
                                activeStyle={ style } > Formula </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );

    }
}

export default NavBar;