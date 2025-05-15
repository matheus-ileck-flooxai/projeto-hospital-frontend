import React from "react";
import './menu.css'
import { Link } from 'react-router';

export default props =>

    <ul className="sidebar-menu">
        <li className="menu-item"><Link to="/Hospital/usuarios">Usuarios</Link></li>
        <li className="menu-item"><Link to="/Hospital/vagas">Vagas</Link></li>
        <li className="menu-item"><Link to="/Hospital/voluntarios">Voluntarios</Link></li>
        <li className="menu-item"><Link to="/Hospital/pontuacao">Pontuação</Link></li>
    </ul>