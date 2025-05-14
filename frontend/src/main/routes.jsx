import React from "react";
import {Router, Route, Redirect, hashHistory} from 'react-router'
import Auth from '../auth/auth'
import Hospital from "../hospital/hospital";

export default props => (
    
    <Router history={hashHistory}>
        <Route path='/auth' component={Auth} />
        <Route path='/hospital' component={Hospital} />

        <Redirect from='*' to='/auth' />
    </Router>
)