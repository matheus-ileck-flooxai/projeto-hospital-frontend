import React from "react";
import { Router, Route, Redirect, IndexRedirect, hashHistory } from 'react-router'
import Auth from '../auth/hospitalAuth'
import Hospital from "../hospital/hospital";
import Vaga from "../hospital/vagas/vaga";
import Usuarios from "../hospital/usuarios/usuarios";
import Pedidos from "../hospital/pedidos/pedidos";
import Pontuacao from "../hospital/pontuacao/pontuacao";
import userAuth from "../auth/userAuth";
import voluntarios from "../voluntarios/voluntarios";
import Vagas from "../voluntarios/vagas/vagas";

export default props => (

    <Router history={hashHistory}>
        <Route path='/hospital/auth' component={Auth} />
        <Route path='/user/auth' component={userAuth} />
        <Route path='/hospital' component={Hospital}>
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