import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './User.module.css';
import { history } from '../../../_helpers/history'

import Popup from '../../Elements/Popup/Popup'
import { userActions } from '../../../_actions';
import { connect } from 'react-redux'

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
        this.popupHandler()
    }

    logoutHandler = () => {
        // console.log("btn of logout")
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        this.popupHandler()
    }

    clickedLogin = () => {
        // console.log(this.props)
        history.push('/login');
    }

    render() {
        const { loggedIn, user } = this.props
        var popup = null;
        if (this.state.showPopup) {
            popup = (<Popup clickedProfile={this.profileHandler} isLogin={loggedIn}
                clickedLogout={this.logoutHandler} clickedLogin={this.clickedLogin} closePopup={this.popupHandler} 
                >{loggedIn === true ? user.username : 'Cost Manager' }</Popup>)
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
                    <span>{loggedIn === true ? user.username : 'Cost Manager' }</span>
                </div>
                <div>
                    <FontAwesomeIcon color="rgb(0, 0, 0)" size="2x" icon="question-circle" />
                </div>
            </div>
        );
    }

}
function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    return {
        loggedIn, user
    };
}
const connectedUserPage = connect(mapStateToProps)(User)
export default connectedUserPage
// export default User;