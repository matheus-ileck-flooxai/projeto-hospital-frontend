import React, { Component } from "react";
import axios from "axios";
import './auth.css'
import { hashHistory } from 'react-router'
import Logo from './logo.png'

export default class Auth extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            senha: ''
        };
    }



    onSubmit(e) {
        const { email, senha } = this.state

        e.preventDefault();

        axios.post('http://localhost:3003/api/login', { email, senha })
            .then(resp => {

                console.log(resp.data.user._id);
                localStorage.setItem('userId', userId)

                hashHistory.push('/hospital')
            })
            .catch(err => {
                console.log(err.message);


            })
    }

    render() {
        const { email, senha } = this.state

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
                            <label htmlFor="senha" className="label">Senha:</label>
                            <input type="password" name="senha" value={senha} placeholder="Digite sua senha" onChange={(e) => this.setState({ senha: e.target.value })} required />

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