import React, { Component } from "react";
import { Link } from "react-router";
import './header.css';
import Logo from '../../assets/img/logo2.png';
const jwt_decode = require('jwt-decode');

export default class HeaderVoluntario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');


        if (token) {
            const decoded = jwt_decode.jwtDecode(token);
            const role = decoded.role
            this.setState({ role }, () => {
            });

        }
    }



    render() {

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
                                <Link to="/volunteer/inicio"><img alt="Brand" src={Logo} width={50} /></Link>

                            </div>
                        </form>
                        <ul className="nav navbar-nav navbar-right" id="nav-items">
                            {this.state.role === 'Volunteer' && <li><Link to="/volunteer/profile">Perfil</Link></li>}
                            {this.state.role === 'Volunteer' && <li><Link to="/volunteer/inicio">Inicio</Link></li>}

                            {this.state.role === 'Volunteer' && <li><Link to="/volunteer/vacancies">Vagas</Link></li>}
                            {this.state.role === 'Volunteer' && <li><Link to="/volunteer/leaderboard">Pontuação</Link></li>}
                            {this.state.role === 'Volunteer' && <li><Link to="/user/auth">Sair</Link></li>}


                            {this.state.role !== 'Volunteer' && <li><Link to="/user/auth">Entrar</Link></li>}
                            {this.state.role !== 'Volunteer' && <li><a href="#about">Sobre</a></li>}
                            {this.state.role !== 'Volunteer' && <li><a href="#vagas">Vagas</a></li>}
                            {this.state.role !== 'Volunteer' && <li><Link to="/volunteer/leaderboard">Pontuação</Link></li>}


                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
