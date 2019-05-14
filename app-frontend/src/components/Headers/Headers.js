import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import logo from '../../logo.svg';
import './Headers.css'
import User from './User/User.js'

class Headers extends Component {

    backToLogin = () => {
        return <Redirect to="/" />;
    }

    render() {
        return (
            <div className="headers">
                <div className="left row">
                    <img src={logo} className="App-logo" alt="logo" onClick={this.backToLogin}/>
                </div>
                <div className="row"></div>
                <div className="row"></div>
                <div className="user row">
                    <User />
                </div>
            </div>
        );
    }

}

export default Headers;