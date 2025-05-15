import React from "react";
import Logo from '../../assets/img/logo.png'
import './header.css'

export default props =>
    <header className='main-header'>
       <nav className="nav">
            <a className="navbar-brand" href="#">Hospital</a>
            <ul className="navbar-list">
                <li><a href="#">Perfil</a></li>
                <li><a href="#">Sair</a></li>
            </ul>
        </nav>
    </header>