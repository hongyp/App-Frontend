import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './User.module.css';

import Popup from '../../Elements/Popup/Popup'

class User extends Component {

    state = {
        showPopup: false
    }

    popupHandler = (event) => {
        const state = { ...this.state };
        const showPopup = !state.showPopup
        this.setState({ showPopup: showPopup })
    }

    profileHandler = () => {
        console.log("btn of popup")
    }

    logoutHandler = () => {
        console.log("btn of logout")
    }

    render() {

        var popup = null;
        if (this.state.showPopup) {
            popup = (<Popup clickedProfile={this.profileHandler} clickedLogout={this.logoutHandler} closePopup={this.popupHandler} />)
        }

        return (
            <div className={classes.Container}>
                <div className={classes.UserLogo} onClick={(e) => this.popupHandler(e)}>
                    <div>
                        <FontAwesomeIcon color="rgb(0, 0, 0)" size="2x" icon="user-circle" />
                    </div>
                </div>
                <div>
                    {popup}
                </div>
                <div className={classes.Title}>
                    <span>Cost Manager</span>
                </div>
                <div>
                    <FontAwesomeIcon color="rgb(0, 0, 0)" size="2x" icon="question-circle" />
                </div>
            </div>
        );
    }

}

export default User;