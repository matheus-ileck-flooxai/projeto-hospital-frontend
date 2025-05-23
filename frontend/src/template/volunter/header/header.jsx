import React from "react";
import './header.css'
import Logo from '../../assets/img/logo2.png'

export default props => (

    <nav className="navbar navbar-default">
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

                    </div>
                </form>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Entrar</a></li>
                    <li><a href="#">Vagas</a></li>
                    <li><a href="#">Sobre</a></li>


                </ul>
            </div>
        </div>
    </nav>
)