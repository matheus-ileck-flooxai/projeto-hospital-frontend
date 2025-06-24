import React, { Component } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo2.png'
import Alert from "react-s-alert"
import InputMask from 'react-input-mask';


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

        this.date = new Date()
        this.maxDate = new Date(
            this.date.getFullYear() - 18,
            this.date.getMonth(),
            this.date.getDate()
        ).toISOString().split('T')[0];

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


    alerta(msg, error = false) {

        if (error) {
            Alert.error(msg, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3000
            });
        }
        else {
            Alert.success(msg, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3000
            });
        }

    }
    toggleRules() {

        if (!this.state.show_rules) {
            this.setState({ show_rules: true })
        }
        else {
            this.setState({ show_rules: false })
        }
    }


    register(e) {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }
        const { name, address, email, age, password, role, phone_number } = this.state;
        const newUser = { name, address, age, email, role, password, phone_number };

        const url = `https://backend-hospital-production.up.railway.app/api/user/register`;
        axios.post(url, newUser)
            .then(resp => {
                this.setState({ showForm: false });
                this.alerta('Cadastro realizado com Sucesso!');

                setTimeout(() => {
                    hashHistory.push('/user/auth');
                }, 1500);
            })
            .catch(err => {
                console.log(err.response.data);

                if (err.response) {
                    this.alerta('Erro: ' + err.response.data.message, true);
                } else {
                    this.alerta('Erro de conexão com o servidor', true);
                }
            });
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
                                pattern="^[A-Za-zÀ-ú\s]+$"
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
                                max={this.maxDate}
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
                            <InputMask
                                mask="(99) 99999-9999"
                                maskChar=""
                                type="tel"
                                name="phone_number"
                                placeholder="(99) 99999-9999"
                                value={this.state.phone_number}
                                onChange={(e) => this.setState({ phone_number: e.target.value })}
                                required
                            />
                        </div>


                        <div className="grupo-inputs">
                            <label htmlFor="password" className="label">Senha:</label>
                            <input
                                type="password"
                                name="password"
                                title="Senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                                value={this.state.password}
                                placeholder="Digite sua senha"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                onClick={() => this.toggleRules()}
                                required
                            />

                        </div>
                        <ul className={this.state.show_rules ? 'password-rules show' : 'password-rules hide'}>

                            <li>1 Letra maiúscula.</li>
                            <li>1 Letra minúscula.</li>
                            <li>1 Caractere especial.</li>
                            <li>Mínimo 8 caracteres.</li>
                            <li>Minimo 1 Número.</li>

                        </ul>
                        <a href="#/hospital/auth" className="redirect-button">Cadastrar um hospital</a>

                        <div className="grupo-inputs button-form">
                            <button type="submit" className="btn-submit">Cadastrar</button>
                            <a href="/#/user/auth">Já possuo uma conta</a>
                        </div>
                        <Alert stack={{ limit: 3 }} timeout={3000} />

                    </form>
                </div>
            </div>

        )

    }
}