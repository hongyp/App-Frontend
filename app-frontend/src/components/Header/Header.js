import React, { Component } from 'react'

import logo from '../../logo.svg';
import classes from './Header.module.css'
import User from './User/User.js'

class Header extends Component {

    state = {
        
    }

    backToLogin = () => {
        // return this.props.history.push('/resource');
        console.log("backToHomePage")
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.LogoPart}>
                    {/* <a onClick={this.backToLogin} href="#"> */}
                        <img src={logo} className={classes.AppLogo} alt="logo"/>
                    {/* </a> */}
                </div>
                <div className={classes.TitlePart}>
                    Project 1
                </div>
                <div className={classes.UserPart}>
                    <User />
                </div>
            </div>
        );
    }

}

export default Header;