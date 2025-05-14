import React from "react";
import Logo from '../../assets/img/logo.png'
import './header.css'

export default props =>
    <header className='main-header'>
        <div className="navbar-header">
            <a className="navbar-brand" href="#">Hospital</a>
        </div>
        <ul className="nav navbar-nav">
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Funcionarios</a></li>
            <li><a href="#">Vagas</a></li>
        </ul>
    </header>