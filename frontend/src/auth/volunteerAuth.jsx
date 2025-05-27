import React, { Component } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo2.png'

export default class volunteerAuth extends Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            age: '',
            role: 'Volunteer',
            phone_number: '',
            score: 0
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



    register(e) {
        e.preventDefault();

        const { name, address, email, age, password,role, phone_number } = this.state;
        const newUser = { name, address,age, email, role,password, phone_number };

        const url = 'https://projeto-hospital-backend-production.up.railway.app//api/user/register';
        axios.post(url, newUser)
            .then(resp => {
                this.setState({ showForm: false });
                hashHistory.push('/user/auth')
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {

        return (
            <div className="auth-container">
                <div className="login-box">
                    <img src={Logo} alt="Logo" className="logo" />
                    <form onSubmit={this.register} className="form-register">
                        <div className="grupo-inputs">
                            <label htmlFor="name" className="label">Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                placeholder="Digite seu nome"
                                onChange={(e) => this.setState({ name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label htmlFor="age" className="label">Data de nascimento:</label>
                            <input
                                type="date"
                                name="age"
                                value={this.state.age}
                                placeholder="Digite sua idade"
                                onChange={(e) => this.setState({ age: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label htmlFor="email" className="label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={this.state.email}
                                placeholder="Digite seu e-mail"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label htmlFor="phone_number" className="label">Telefone contato:</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={this.state.phone_number}
                                placeholder="Digite o telefone"
                                onChange={(e) => this.setState({ phone_number: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label htmlFor="password" className="label">Senha:</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                placeholder="Digite sua senha"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                required
                            />
                        </div>
                        <a href="#/hospital/auth" className="redirect-button">Cadastrar um hospital</a>

                        <div className="grupo-inputs button-form">
                            <button type="submit" className="btn-submit">Cadastrar</button>
                            <a href="/#/user/auth">Já possuo uma conta</a>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}