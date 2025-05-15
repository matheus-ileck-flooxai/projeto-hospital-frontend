import React from "react";
import './menu.css'
import { Link } from 'react-router';

export default props =>

    <ul className="sidebar-menu">
        <li className="menu-item">Usuarios</li>
        <li className="menu-item"><Link to="/Hospital/vagas">Vagas</Link></li>
        <li className="menu-item">Voluntarios</li>
        <li className="menu-item">Pontuação</li>
    </ul>