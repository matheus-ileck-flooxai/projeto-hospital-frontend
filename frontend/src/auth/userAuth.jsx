import React, { Component } from "react";
const jwt_decode = require('jwt-decode');


import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo2.png'

export default class userAuth extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            password: '',
            message: '',
            showForm: false
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
                if (decoded.exp && decoded.exp > currentTime && decoded.role === 'Admin') {
                    hashHistory.push('/hospital');
                } else {
                    localStorage.removeItem('token');
                }
            } catch (err) {
                localStorage.removeItem('token');
            }
        }
    }

    login(e) {
        e.preventDefault();
        const { email, password } = this.state;

        const url = `https://projeto-hospital-frontend.vercel.app/api/user/login`;
        axios.post(url, { email, password })
            .then(resp => {

                this.setState({ message: resp.message })

                localStorage.setItem('token', resp.data.token)

                const token = localStorage.getItem('token')
                const decoded = jwt_decode.jwtDecode(token)
                if (token) {

                    const role = decoded.role

                    if (role === 'Admin') {
                        hashHistory.push('/hospital')
                    }
                    else {
                        hashHistory.push('/volunteer')
                    }
                }


            })
            .catch(err => {
                console.log(err);

                this.setState({ message: err.message })

            })
    }


    render() {
        const { email, password } = this.state;

        return (
            <div className="auth-container">
                <div className="login-box">
                    <img src={Logo} alt="Logo" className="logo" />

                    <form onSubmit={this.login} className="form-login">
                        <p className="msg-inicial">Seja bem vindo!</p>

                        <div className="grupo-inputs">
                            <label htmlFor="email" className="label">Email:</label>
                            <input type="email" name="email" value={email} placeholder="Digite seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="password" className="label">Senha:</label>
                            <input type="password" name="password" value={password} placeholder="Digite sua senha" onChange={(e) => this.setState({ password: e.target.value })} required />
                        </div>

                        {this.state.message && (<p className="danger">Dados inválidos!</p>)}
                        <a href="#/user/register">Não tem uma conta? Cadastre-se</a>

                        <div className="grupo-inputs button-form">

                            <button type="submit" className="btn-submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}