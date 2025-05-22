import React from "react";
import { Router, Route, Redirect, IndexRedirect,hashHistory } from 'react-router'
import Auth from '../auth/auth'
import Hospital from "../hospital/hospital";
import Vaga from "../hospital/vagas/vaga";
import Usuarios from "../hospital/usuarios/usuarios";
import Pedidos from "../hospital/pedidos/pedidos";
import Pontuacao from "../hospital/pontuacao/pontuacao";

export default props => (

    <Router history={hashHistory}>
        <Route path='/auth' component={Auth} />
        <Route path='/hospital' component={Hospital}>
            <IndexRedirect to="usuarios" />
            <Route path='usuarios' component={Usuarios} />
            <Route path='vagas' component={Vaga} />
            <Route path='pedidos' component={Pedidos} />
            <Route path='pontuacao' component={Pontuacao} />
        </Route>

        <Redirect from='*' to='/auth' />
    </Router>
)