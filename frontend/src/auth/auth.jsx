import React, { Component } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo2.png'

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            address: '',
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

    login(e) {
        e.preventDefault();
        const { email, password } = this.state;

        const url = 'https://projeto-hospital-backend-production.up.railway.app/api/hospital/login';
        axios.post(url, { email, password })
            .then(resp => {
                localStorage.setItem('token', resp.data.token)
                hashHistory.push('/hospital')
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    register(e) {
        e.preventDefault();

        const { name, address, email, password } = this.state;
        const newHospital = { name, address, email, password };

        const url = 'https://projeto-hospital-backend-production.up.railway.app/api/hospital/register';
        axios.post(url, newHospital)
            .then(resp => {
                this.setState({ showForm: false });
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    render() {
        const { email, password, name, address, showForm } = this.state;

        return (
            <div className="auth-container">
                <div className="login-box">
                    <img src={Logo} alt="Logo" className="logo" />
                    {!showForm ? (
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
                            <div className="grupo-inputs button">
                                <button type="submit" className="btn-submit">Entrar</button>
                                <a onClick={() => this.setState({ showForm: true })}>Criar nova conta</a>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={this.register} className="form-register">
                            <div className="grupo-inputs">
                                <label htmlFor="name" className="label">Nome:</label>
                                <input type="text" name="name" value={name} placeholder="Nome do hospital" onChange={(e) => this.setState({ name: e.target.value })} required />
                            </div>
                            <div className="grupo-inputs">
                                <label htmlFor="address" className="label">Endereço:</label>
                                <input type="text" name="address" value={address} placeholder="Endereço" onChange={(e) => this.setState({ address: e.target.value })} required />
                            </div>
                            <div className="grupo-inputs">
                                <label htmlFor="email" className="label">Email:</label>
                                <input type="email" name="email" value={email} placeholder="Digite seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} required />
                            </div>
                            <div className="grupo-inputs">
                                <label htmlFor="password" className="label">Senha:</label>
                                <input type="password" name="password" value={password} placeholder="Digite sua senha" onChange={(e) => this.setState({ password: e.target.value })} required />
                            </div>
                            <div className="grupo-inputs button">
                                <button type="submit" className="btn-submit">Cadastrar</button>
                                <a onClick={() => this.setState({ showForm: false })}>Já possuo uma conta</a>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        )
    }
}
