import React, { Component } from "react";
import './perfil.css'
import Axios from "axios";
import Logo from '../../template/assets/img/logo2.png'

const jwt_decode = require('jwt-decode');


export default class profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            readOnly: true
        }


    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode.jwtDecode(token)

            const id = decoded.userid;

            Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/volunteer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.setState({ user: resp.data }, () => {
                    console.log(this.state.user);

                })


            })

        }

    }

    render() {

        return (
            <div className="container profile-content">
                <div className="main-body">


                    <div className="row">


                        <div className="col-md-12">
                            <div className="panel panel-default " id="panel-content" style={{ marginBottom: '15px', }}>
                                <div className="panel-body text-center">
                                    <img src={Logo} alt="Admin" className="img-circle" width="150" />
                                    <div style={{ marginTop: '15px' }}>
                                        <h4>{this.state.user.name}</h4>
                                        <p className="text-muted">{this.idade} anos</p>

                                    </div>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <strong>Nome completo</strong>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                readOnly={this.state.readOnly}
                                                type="text"
                                                className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                value={this.state.user.name}
                                                onChange={(e) => this.setState({ user: { ...this.state.user, name: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <strong>data de nascimento</strong>
                                        </div>
                                        {this.state.readOnly ? (
                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={true}
                                                    type="text"
                                                    className={`profile-inputs`}
                                                    value={new Date(this.state.user.age).toLocaleDateString()}
                                                    onChange={(e) => this.setState({ user: { ...this.state.user, age: e.target.value } })}
                                                />



                                            </div>) :
                                            (
                                                <input
                                                    type="date"
                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit-date' : ''}`}
                                                    value={this.state.user.age}
                                                    onChange={(e) => this.setState({ user: { ...this.state.user, age: e.target.value } })}
                                                />
                                            )
                                        }
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <strong>Email</strong>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                readOnly={this.state.readOnly}
                                                type="email"
                                                className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                value={this.state.user.email}
                                                onChange={(e) => this.setState({ user: { ...this.state.user, email: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <strong>Telefone</strong>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                readOnly={this.state.readOnly}
                                                type="text"
                                                className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                value={this.state.user.phone_number}
                                                onChange={(e) => this.setState({ user: { ...this.state.user, phone_number: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <strong>Pontuação</strong>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                readOnly={this.state.readOnly}
                                                type="number"
                                                className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`} 
                                                value={this.state.user.score}
                                                onChange={(e) => this.setState({ user: { ...this.state.user, score: e.target.value } })}
                                            />
                                        </div>
                                    </div>

                                    <div className="row buttons" style={{ marginTop: '15px' }}>
                                        <div className="col-sm-12">
                                            <a className="btn btn-edit" onClick={() => this.setState({readOnly: false})}>
                                                Editar
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
