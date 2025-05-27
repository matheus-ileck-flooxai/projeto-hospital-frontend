import React from "react";
import { Router, Route, Redirect, IndexRedirect, hashHistory } from 'react-router'
import Hospital from "../hospital/hospital";
import Vaga from "../hospital/vagas/vaga";
import Usuarios from "../hospital/usuarios/usuarios";
import Pedidos from "../hospital/pedidos/pedidos";
import Pontuacao from "../hospital/pontuacao/pontuacao";
import userAuth from "../auth/userAuth";
import voluntarios from "../voluntarios/voluntarios";
import Vagas from "../voluntarios/vagas/vagas";
import hospitalAuth from "../auth/hospitalAuth";
import volunteerAuth from "../auth/volunteerAuth";


function requireAuth(nextState, replace) {
    const token = localStorage.getItem('token');

    if (!token) {
        replace({
            pathname: '/user/auth'
        });
    }
}

export default props => (

    <Router history={hashHistory} >
        <Route path='/user/register' component={volunteerAuth} />
        <Route path='/hospital/auth' component={hospitalAuth} />
        <Route path='/user/auth' component={userAuth} />
        <Route path='/hospital' component={Hospital} onEnter={requireAuth}>
            <IndexRedirect to="usuarios" />
            <Route path='usuarios' component={Usuarios} />
            <Route path='vagas' component={Vaga} />
            <Route path='pedidos' component={Pedidos} />
            <Route path='pontuacao' component={Pontuacao} />
        </Route>
        <Route path='/volunteer' component={voluntarios} >
            <IndexRedirect to="vagas" />
            <Route path='vagas' component={Vagas} />
        </Route>

        <Redirect from='*' to='/volunteer' />
    </Router>
)