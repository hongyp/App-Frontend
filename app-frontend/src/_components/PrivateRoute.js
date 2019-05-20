import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TableData from '../containers/TableData/TableData'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <TableData {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)