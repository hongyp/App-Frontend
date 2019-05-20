import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios/axios-app'
// import logo from '../../logo.svg';
import logo from '../../asset/logo.png'
import classes from './Header.module.css'
import User from './User/User.js'
import { history } from '../../_helpers/history'

class Header extends Component {

    state = {
        CurrentProjectId: 1,
        CurrentProjectName: ''
    }

    componentDidMount() {
        axios.get('/getProject/' + this.state.CurrentProjectId)
            .then(reponse => {
                this.setState({CurrentProjectName: reponse.data.name})
            })
    }

    backToLogin = () => {
        history.push('login');
    }

    resetHeader(projectId) {
        axios.get('/getProject/' + projectId)
            .then(reponse => {
                this.setState({CurrentProjectId: projectId,
                        CurrentProjectName: reponse.data.name})
            })
    }

    render() {

        const { projectId } = this.props
        if (projectId !== undefined) {
            if (projectId !== this.state.CurrentProjectId) {
                this.resetHeader(projectId)
            }
        }
        return (
            <div className={classes.Container}>
                <div className={classes.LogoPart} onClick={this.backToLogin}>
                    <img src={logo} className={classes.AppLogo} alt="logo"/>
                </div>
                <div className={classes.TitlePart}>
                    {this.state.CurrentProjectName}
                </div>
                <div className={classes.UserPart}>
                    <User />
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { projectId } = state.project
    return {
        projectId
    }
}
const connectedHeader = connect(mapStateToProps)(Header)
export default connectedHeader;
// export default Header;