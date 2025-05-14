import React, { Component } from "react";
import axios from "axios";
import './auth.css'
class Auth extends Component {



    render() {

        return (
            <div className="login-container">
                <div className="login-box">
                    <h1>Bem vindo!</h1>
                    <form action="#" className="form-login">
                        <div className="grupo-inputs">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" placeholder="Digite seu e-mail" />
                        </div>
                        <div className="grupo-inputs">
                            <label htmlFor="senha">Senha: </label>
                            <input type="password" name="senha" placeholder="Digite seu e-mail" />

                        </div>
                        <div className="grupo-inputs">

                            <button type="submit">Entrar</button>
                            <button>Criar nova conta</button>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}

module.exports = Auth