import React from "react";
import './menu.css'
import { Link } from 'react-router';

export default props =>

    <ul className="sidebar-menu">
        <Link to="/Hospital/usuarios"><li className="menu-item">Usuarios</li></Link>
        <Link to="/Hospital/vagas" > <li className="menu-item">Vagas</li></Link>
        <Link to="/Hospital/voluntarios" > <li className="menu-item">Voluntarios</li></Link>
    </ul >