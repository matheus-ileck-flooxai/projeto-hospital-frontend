import React from "react";
import { Router, Route, Redirect, IndexRedirect, hashHistory } from 'react-router'
import Hospital from "../hospital/hospital";
import Vaga from "../hospital/vagas/vaga";
import Usuarios from "../hospital/usuarios/usuarios";
import Pedidos from "../hospital/pedidos/pedidos";
import Pontuacao from "../hospital/pontuacao/pontuacao";
import UserAuth from "../auth/userAuth";
import Voluntarios from "../voluntarios/voluntarios";
import Vagas from "../voluntarios/vagas/vagas";
import HospitalAuth from "../auth/hospitalAuth";
import VolunteerAuth from "../auth/volunteerAuth";
import Perfil from "../voluntarios/perfil/perfil";
const jwt_decode = require('jwt-decode');


function requireAuth(admin = false) {
    return (nextState, replace) => {
        const token = localStorage.getItem('token');
        if (!token) {
            replace({ pathname: '/user/auth' });
            return;
        }

        let role;
        try {
            const decoded = jwt_decode.jwtDecode(token);
            role = decoded.role;
        } catch (error) {
            replace({ pathname: '/user/auth' });
            return;
        }

        if (admin && role !== 'Admin') {
            replace({ pathname: '/user/auth' });
            return;
        }

        if (!admin && role !== 'Volunteer') {
            replace({ pathname: '/hospital/auth' });
            return;
        }
    };
}

export default props => (
    <Router history={hashHistory} >
        <Route path='/user/register' component={VolunteerAuth} />
        <Route path='/hospital/auth' component={HospitalAuth} />
        <Route path='/user/auth' component={UserAuth} />

        <Route path='/hospital' component={Hospital} onEnter={requireAuth(true)}>
            <IndexRedirect to="users" />
            <Route path='users' component={Usuarios} />
            <Route path='vacancies' component={Vaga} />
            <Route path='applications' component={Pedidos} />
            <Route path='leaderboard' component={Pontuacao} />
        </Route>

        <Route path='/volunteer' component={Voluntarios} onEnter={requireAuth(false)}>
            <IndexRedirect to="vacancies" />
            <Route path='vacancies' component={Vagas} />
            <Route path='profile' component={Perfil} />
        </Route>

        <Redirect from='*' to='/volunteer' />
    </Router>
);
