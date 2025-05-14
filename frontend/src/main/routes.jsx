import React from "react";
import {Router, Route, Redirect, hashHistory} from 'react-router'
import Auth from '../auth/auth'

export default props => (
    
    <Router history={hashHistory}>
        <Route path='/auth' component={Auth} />
        <Redirect from='*' to='/' />
    </Router>
)