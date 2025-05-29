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
        this.onSubmit = this.onSubmit.bind(this);



    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode.jwtDecode(token)

            const id = decoded.userid;

            Axios.get(`http://localhost:3306/api/volunteer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.setState({ user: resp.data })


            })

        }

    }

    toggleEditForm() {
        if (this.state.readOnly == true) {
            this.setState({ readOnly: false })
        }
        else {
            this.setState({ readOnly: true })
        }
    }



    onSubmit(e) {

        e.preventDefault();

        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode.jwtDecode(token);

        const id = decodedToken.userid;

        const formData = new FormData(e.target);

        const User = {
            name: formData.get('name'),
            phone_number: formData.get('phone_number'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: new Date(formData.get('age')).toISOString(),
        };

        if (id) {
            Axios.put(`http://localhost:3306/api/volunteer/${id}`, User, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.setState({
                    readOnly: true,
                    user: resp.data.updatedUser
                }, () => {
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
                                        {this.idade ? (<p className="text-muted">{this.idade} anos</p>) : ('')}

                                    </div>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.onSubmit} className="form-edit-profile">

                                        <div className="row">

                                            <div className="col-sm-3">
                                                <strong>Nome completo</strong>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={this.state.readOnly}
                                                    type="text"
                                                    name="name"
                                                    pattern="^[A-Za-zÀ-ú\s]+$"
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
                                                        value={this.state.user.age ? new Date(this.state.user.age).toISOString().split('T')[0] : ''}
                                                        onChange={(e) => this.setState({ user: { ...this.state.user, age: e.target.value } })}
                                                    />



                                                </div>) :
                                                (
                                                    <input
                                                        type="date"
                                                        name="age"

                                                        className={`profile-inputs ${!this.state.readOnly ? 'edit-date' : ''}`}
                                                        value={this.state.user.age ? new Date(this.state.user.age).toISOString().split('T')[0] : ''}
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
                                                    name="email"

                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                    value={this.state.user.email}
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
                                                    name="phone_number"
                                                    pattern="\d{10,11}"
                                                    placeholder="Ex: xxxxxxxxxxx"
                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                    value={this.state.user.phone_number}
                                                    onChange={(e) => this.setState({ user: { ...this.state.user, phone_number: e.target.value.replace(/\D/g, "") } })}
                                                />
                                            </div>
                                        </div>
                                        <hr />

                                        {!this.state.readOnly ? (<div className="row">
                                            <div className="col-sm-3">
                                                <strong>Senha:</strong>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={this.state.readOnly}
                                                    type="text"
                                                    name="password"
                                                    title="Senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                    value={this.state.user.password}
                                                    onChange={(e) => this.setState({ user: { ...this.state.user, password: e.target.value } })}
                                                />
                                            </div>

                                        </div>) :
                                            (<div className="row">
                                                <div className="col-sm-3">
                                                    <strong>Senha:</strong>
                                                </div>
                                                <div className="col-sm-9">
                                                    <input
                                                        readOnly={true}
                                                        type="password"
                                                        name="password"
                                                        className={`profile-inputs`}
                                                        value={this.state.user.password}
                                                        onChange={(e) => this.setState({ user: { ...this.state.user, password: e.target.value } })}
                                                    />
                                                </div>

                                            </div>)
                                        }
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <strong>Pontuação</strong>
                                            </div>
                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={true}
                                                    type="number"
                                                    className={`profile-inputs`}
                                                    value={this.state.user.score}
                                                    onChange={(e) => this.setState({ user: { ...this.state.user, score: e.target.value } })}
                                                />
                                            </div>
                                        </div>

                                        <div className="row buttons" style={{ marginTop: '15px' }}>
                                            <div className="col-sm-12">
                                                <div className="profile-group-buttons">
                                                    <button type="button" className="btn btn-edit" onClick={() => this.toggleEditForm()}>{this.state.readOnly ? ('Editar') : ('cancelar')}</button>
                                                    {!this.state.readOnly && (
                                                        <button type="submit" className="btn btn-edit-profile">
                                                            Enviar
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
