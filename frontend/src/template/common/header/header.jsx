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
        <header>
            <nav className="navbar" id="navbar-admin">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>

                        </button>

                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <img alt="Brand" src={Logo} width={50} />
                                <p>{hospitalName}</p>

                            </div>

                        </form>
                        <ul className="nav navbar-nav navbar-right" >

                            <li><a href="#">Sair</a></li>


                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}