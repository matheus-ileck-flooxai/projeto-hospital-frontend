import React from "react";
import { Router, Route, Redirect, hashHistory } from 'react-router'
import Auth from '../auth/auth'
import Hospital from "../hospital/hospital";
import Vaga from "../hospital/vagas/vaga";

export default props => (

    <Router history={hashHistory}>
        <Route path='/auth' component={Auth} />
        <Route path='/hospital' component={Hospital}>
            <Route path='usuarios' component={Vaga}/>
            <Route path='vagas' component={Vaga}/>
            <Route path='voluntarios' component={Vaga}/>
            <Route path='pontuacao' component={Vaga}/>
        </Route>

        <Redirect from='*' to='/auth' />
    </Router>
)