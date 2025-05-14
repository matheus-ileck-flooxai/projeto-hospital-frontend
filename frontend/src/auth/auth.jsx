import React, { Component } from "react";
import axios from "axios";
import './auth.css'
class Auth extends Component {

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
                    <h1>Bem vindo!</h1>
                    <form onSubmit={this.onSubmit} className="form-login">
                        <div className="grupo-inputs">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" value={email} placeholder="Digite seu e-mail" onChange={(e) => this.setState({ email: e.target.value })} required />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="senha">Senha: </label>
                            <input type="password" name="senha" value={senha} placeholder="Digite sua senha" onChange={(e) => this.setState({ senha: e.target.value })} required />

                        </div>
                        <div className="grupo-inputs">

                            <button type="submit" >Entrar</button>
                            <button>Criar nova conta</button>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}

module.exports = Auth