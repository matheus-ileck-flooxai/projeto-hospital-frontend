import React from "react";
import { Router, Route, Redirect, IndexRedirect, hashHistory } from 'react-router'
import Hospital from "../hospital/hospital";
import Vaga from "../hospital/vagas/vaga";
import Usuarios from "../hospital/usuarios/usuarios";
import Pedidos from "../hospital/pedidos/pedidos";
import UserAuth from "../auth/userAuth";
import Voluntarios from "../voluntarios/voluntarios";
import Inicio from "../voluntarios/inicio/inicio";
import HospitalAuth from "../auth/hospitalAuth";
import VolunteerAuth from "../auth/volunteerAuth";
import Perfil from "../voluntarios/perfil/perfil";
import Pontuacao from "../voluntarios/pontuacao/pontuacao";
import Vagas from "../voluntarios/vagas/vagas";
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
            const currentTime = Date.now() / 1000;
            if (decoded.exp && decoded.exp < currentTime) {

                localStorage.removeItem('token');
                replace({ pathname: '/user/auth' });
                return;
            }
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
        </Route>

        <Route path='/volunteer' component={Voluntarios} >
            <IndexRedirect to="inicio" />
            <Route path='inicio' component={Inicio} />
            <Route path='profile' component={Perfil} onEnter={requireAuth(false)} />
            <Route path='leaderboard' component={Pontuacao} />
            <Route path='vacancies' component={Vagas} onEnter={requireAuth(false)} />
        </Route>

        <Redirect from='*' to='/volunteer' />
    </Router>
);
