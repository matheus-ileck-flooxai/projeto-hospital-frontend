import React, { Component } from "react";
import './header.css';
import Logo from '../../assets/img/logo2.png';
const jwt_decode = require('jwt-decode');

export default class HeaderVoluntario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            user: null,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');


        if (token) {
                const decoded = jwt_decode.jwtDecode(token);
                this.setState({ token, user: decoded });


        }
    }

    logout (){
        localStorage.removeItem('token');
        this.setState({ token: null, user: null });
    }

    render() {
        const { token } = this.state;
        

        return (
            <nav className="navbar navbar-default" id="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <img alt="Brand" src={Logo} width={50} />
                            </div>
                        </form>
                        <ul className="nav navbar-nav navbar-right" id="nav-items">
                            {token ? (
                                [
                                    <li key="perfil"><a href="#">Perfil</a></li>,
                                    <li key="sair"><a href="#/user/auth" onClick={this.logout}>Sair</a></li>
                                ]
                            ) : (
                                [
                                    <li key="entrar"><a href="#/user/auth">Entrar</a></li>,
                                    <li key="sobre"><a href="#about">Sobre</a></li>,
                                    <li key="vagas"><a href="#vagas">Vagas</a></li>,
                                    <li key="contato"><a href="#">Contato</a></li>
                                ]
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
