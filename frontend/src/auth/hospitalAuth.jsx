import React, { Component } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from '../template/assets/img/logo2.png'

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            address: '',
            phone_number: '',
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

        const { name, address, email, password,phone_number } = this.state;
        const newHospital = { name, address, email, password, phone_number  };

        const url = 'https://projeto-hospital-backend-production.up.railway.app/api/hospital/register';
        axios.post(url, newHospital)
            .then(resp => {
                this.setState({ showForm: false });
                  hashHistory.push('/user/auth')
            })
            .catch(err => {
                ;
            })
    }

    render() {
        const { email, password, name, address,phone_number, showForm } = this.state;

        return (
            <div className="auth-container">
                <div className="login-box">
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
                                <label htmlFor="phone_number" className="label">Telefone contato:</label>
                                <input type="tel" name="phone_number" value={phone_number} placeholder="Digite o telefone" onChange={(e) => this.setState({ phone_number: e.target.value })} required />
                            </div>
                            <div className="grupo-inputs">
                                <label htmlFor="password" className="label">Senha:</label>
                                <input type="password" name="password" value={password} placeholder="Digite sua senha" onChange={(e) => this.setState({ password: e.target.value })} required />
                            </div>
                            <div className="grupo-inputs button">
                                <button type="submit" className="btn-submit">Cadastrar</button>
                                <a href="/#/user/auth">Já possuo uma conta</a>
                            </div>
                        </form>
                
                </div>
            </div>
        )
    }
}