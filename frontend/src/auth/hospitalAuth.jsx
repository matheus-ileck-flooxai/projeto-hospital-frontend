import React, { Component } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo2.png'
import Alert from "react-s-alert"


export default class hospitalAuth extends Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            address: '',
            phone_number: '',
            show_rules: false
        };
    }

    componentDidMount() {
        this.verifytoken();
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
        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }
        const { name, address, email, password, phone_number } = this.state;
        const newHospital = { name, address, email, password, phone_number };

        const url = `https://projeto-hospital-backend-production.up.railway.app/api/hospital/register`;
        axios.post(url, newHospital)
            .then(resp => {
                this.setState({ showForm: false });
                this.alerta('Cadastro realizado com Sucesso!');
                setTimeout(() => {
                    hashHistory.push('/user/auth');
                }, 1500);

            })
            .catch(err => {

                if (err.response) {
                    this.alerta('Erro: ' + err.response.data.error, true);
                } else {
                    this.alerta('Erro de conexão com o servidor', true);
                }
            });

    }
    toggleRules() {

        if (!this.state.show_rules) {
            this.setState({ show_rules: true })
        }
        else {
            this.setState({ show_rules: false })
        }
    }

    render() {
        const { email, password, name, address, phone_number, showForm } = this.state;

        return (
            <div className="auth-container">
                <div className="login-box">
                    <img src={Logo} alt="Logo" className="logo" />
                    <form onSubmit={this.register} className="form-register">
                        <div className="grupo-inputs">
                            <label htmlFor="name" className="label">Nome:</label>
                            <input type="text" name="name" pattern="^[A-Za-zÀ-ú\s]+$" value={name} placeholder="Nome do hospital" onChange={(e) => this.setState({ name: e.target.value })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="address" className="label">Endereço:</label>
                            <input type="text" name="address" value={address} placeholder="Endereço do hospital" onChange={(e) => this.setState({ address: e.target.value })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="email" className="label">Email:</label>
                            <input type="email" name="email" value={email} placeholder="Digite seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="phone_number" className="label">Telefone contato:</label>
                            <input type="tel" inputMode="numeric" pattern="\d{10,11}" name="phone_number" value={phone_number} placeholder="Ex: xxxxxxxxxxx" onChange={(e) => this.setState({ phone_number: e.target.value.replace(/\D/g, "") })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="password" className="label">Senha:</label>
                            <input type="password"
                                title="Senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                                name="password" value={password} placeholder="Digite sua senha"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                onClick={() => this.toggleRules()}

                                required />

                        </div>
                        <ul className={this.state.show_rules ? 'password-rules show' : 'password-rules hide'}>

                            <li>1 Letra maiúscula</li>
                            <li>1 Letra minúscula</li>
                            <li>Números</li>
                            <li>1 Caractere especial</li>
                            <li>Mínimo 8 caracteres</li>
                        </ul>
                        <a href="#/user/register" className="redirect-button">Cadastrar um usuario</a>

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