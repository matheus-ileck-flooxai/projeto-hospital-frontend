import React from "react";
import './menu.css';
import { Link, withRouter } from 'react-router';

const Menu = (props) => {

    const currentPath = props.location.pathname;

    const isActive = (path) => currentPath === path ? 'active' : '';

    return (
        <ul className="sidebar-menu">
            <Link to="/hospital/users">
                <li className={`menu-item ${isActive('/hospital/users')}`}>
                    <i className="fas fa-user"></i> Usuários
                </li>
            </Link>

            <Link to="/hospital/vacancies">
                <li className={`menu-item ${isActive('/hospital/vacancies')}`}>
                    <i className="fa fa-briefcase"></i> Vagas
                </li>
            </Link>

            <Link to="/hospital/applications">
                <li className={`menu-item ${isActive('/hospital/applications')}`}>
                    <i className="fa fa-handshake"></i> Pedidos
                </li>
            </Link>
        </ul>
    );
}

export default withRouter(Menu);
