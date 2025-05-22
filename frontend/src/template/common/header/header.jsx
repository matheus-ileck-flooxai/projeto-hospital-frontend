import React from "react";
import Logo from '../../assets/img/logo2.png'
import './header.css'
import { jwtDecode } from 'jwt-decode'


export default props => {

    const token = localStorage.getItem('token');
    let hospitalName = 'hospital'

    if (token) {
        const decoded = jwtDecode(token)
        hospitalName = decoded.name


    }
    return (
        <header className='main-header'>
            <nav className="nav">
                <div className="logo-header">
                    <img className="img" src={Logo}></img>
                    <p className="hospital-name">{hospitalName}</p>
                </div>
                <ul className="navbar-list">
                    <li><a href="#">Perfil</a></li>
                    <li><a href="#">Sair</a></li>
                </ul>
            </nav>
        </header>
    )
}