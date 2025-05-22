import React from "react";
import './menu.css'
import { Link } from 'react-router';

export default props =>

    <ul className="sidebar-menu">
        <Link to="/Hospital/usuarios"><li className="menu-item"><i className="fas fa-user"></i>Usuarios</li></Link>
        <Link to="/Hospital/vagas" ><li className="menu-item"><i className="fa fa-briefcase" ></i>Vagas</li></Link>
        <Link to="/Hospital/voluntarios"><li className="menu-item"><i className="fa fa-handshake" ></i>Voluntarios</li></Link>
    </ul >