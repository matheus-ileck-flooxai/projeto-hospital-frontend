import React from "react";
import Logo from '../../assets/img/logo2.png'
import './header.css'
import { jwtDecode } from 'jwt-decode'

export default props => {
    const token = localStorage.getItem('token');
    let hospitalName = 'hospital';

    if (token) {
        const decoded = jwtDecode(token);
        hospitalName = decoded.name;
    }

    return (
        <header>
            <nav className="navbar" id="navbar-admin">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="form-group-mobile">
                            <img alt="Brand" src={Logo} width={40} />
                            <p>{hospitalName}</p>
                            <button
                                type="button"
                                className="navbar-toggle collapsed"
                                onClick={props.toggleAside}
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="barras"></span>
                                <span className="barras"></span>
                                <span className="barras"></span>
                            </button>
                            
                        </div>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <img alt="Brand" src={Logo} width={50} />
                                <p>{hospitalName}</p>
                            </div>
                        </form>
                     
                    </div>
                </div>
            </nav>
        </header>
    )
}
