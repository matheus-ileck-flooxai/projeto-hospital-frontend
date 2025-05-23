import React from "react";
import './menu.css';
import { Link, withRouter } from 'react-router';

const Menu = (props) => {

    const currentPath = props.location.pathname;

    const isActive = (path) => currentPath === path ? 'active' : '';

    return (
        <ul className="sidebar-menu">
            <Link to="/hospital/usuarios">
                <li className={`menu-item ${isActive('/hospital/usuarios')}`}>
                    <i className="fas fa-user"></i> Usuários
                </li>
            </Link>

            <Link to="/hospital/vagas">
                <li className={`menu-item ${isActive('/hospital/vagas')}`}>
                    <i className="fa fa-briefcase"></i> Vagas
                </li>
            </Link>

            <Link to="/hospital/pedidos">
                <li className={`menu-item ${isActive('/hospital/pedidos')}`}>
                    <i className="fa fa-handshake"></i> Pedidos
                </li>
            </Link>
        </ul>
    );
}

export default withRouter(Menu);
