import React, { Component } from "react";
import jwt_decode from 'jwt-decode'

import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo.png'

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        this.verifytoken();
    }
    verifytoken() {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp && decoded.exp > currentTime) {
                    hashHistory.push('/hospital');
                } else {
                    localStorage.removeItem('token');
                }
            } catch (err) {
                localStorage.removeItem('token');
            }
        }

    }

    onSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state


        axios.post(`https://projeto-hospital-backend-production.up.railway.app/api/login`, { email, password })
            .then(resp => {
                localStorage.setItem('token', resp.data.token)
                hashHistory.push('/hospital')
            })
            .catch(err => {
                console.log(err.message);


            })
    }

    render() {
        const { email, password } = this.state

        return (
            <div className="login-container">
                <div className="login-box">
                    <img src={Logo} alt="" className="logo" />
                    <form onSubmit={this.onSubmit} className="form-login">
                        <p className="msg-inicial">Seja bem vindo!</p>

                        <div className="grupo-inputs">
                            <label htmlFor="email" className="label">Email:</label>
                            <input type="email" name="email" value={email} placeholder="Digite seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="password" className="label">Senha:</label>
                            <input type="password" name="password" value={password} placeholder="Digite sua senha" onChange={(e) => this.setState({ password: e.target.value })} required />

                        </div>
                        <div className="grupo-inputs button">

                            <button type="submit" className="btn-submit">Entrar</button>
                            <a>Criar nova conta</a>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}