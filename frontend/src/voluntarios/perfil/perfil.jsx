import React, { Component } from "react";
import './perfil.css'
import Axios from "axios";
import Logo from '../../template/assets/img/logo2.png'
import Alert from "react-s-alert"
import InputMask from 'react-input-mask';

const jwt_decode = require('jwt-decode');


export default class profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            readOnly: true,
            showForm: false,
            application: {},
            newUser: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.date = new Date()
        this.maxDate = new Date(
            this.date.getFullYear() - 18,
            this.date.getMonth(),
            this.date.getDate()
        ).toISOString().split('T')[0];


    }

    alerta(msg, error = false) {

        if (error) {
            Alert.error(msg, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3000
            });
        }
        else {
            Alert.success(msg, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3000
            });
        }

    }


    componentDidMount() {
        this.getUser()

    }
    getUser() {

        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode.jwtDecode(token)

            const id = decoded.userid;

            Axios.get(`https://backend-hospital-production.up.railway.app/api/volunteer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.setState({ user: resp.data })


            })

        }
    }

    toggleEditForm() {
        if (this.state.readOnly) {
            this.setState({
                readOnly: false,
                newUser: {
                    ...this.state.user,
                    oldPassword: '',
                    password: ''
                }
            });
        } else {
            this.setState({
                readOnly: true,
                newUser: {}
            });
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
            oldPassword: formData.get('oldPassword'),
            password: formData.get('password') ? formData.get('password') : this.state.user.password,
            age: new Date(formData.get('age')).toISOString(),
        };


        if (id) {
            Axios.put(`https://backend-hospital-production.up.railway.app/api/volunteer/${id}`, User, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.setState({
                    readOnly: true,
                    newUser: {}

                })
                this.getUser()
                this.alerta('Perfil atualizado com sucesso!')

            })
                .catch(err => {

                    if (err.response) {
                        this.alerta('Erro: ' + err.response.data.error, true);
                    } else {
                        this.alerta('Erro de conexão com o servidor', true);
                    }
                });
        }



    }

    cancelApplication() {

        const applicationId = this.state.application.id

        const token = localStorage.getItem('token');

        Axios.delete(`https://backend-hospital-production.up.railway.app/api/volunteer/cancelapplication/${applicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                this.closeModal();
                this.getUser();
                this.alerta('Candidatura cancelada com sucesso!')

            })
    }
    closeModal() {
        this.setState({
            showForm: false,
            application: {},


        });
    }

    openModal(application) {
        const token = localStorage.getItem('token');

        if (token) {
            this.setState({
                showForm: true,
                application: application
            });
        }

    }
    render() {

        return (
            <div className="container-fluid profile-content">
                <div className="main-body">


                    <div className="row">

                        <div className="col-xs-12 col-md-12 col-lg-4">
                            <div className="panel panel-default " id="panel-content" style={{ marginBottom: '15px', }}>
                                <div className="panel-body text-center">
                                    <img src={Logo} alt="Admin" className="img-circle" width="150" />
                                    <div style={{ marginTop: '15px' }}>
                                        {this.idade ? (<p className="text-muted">{this.idade} anos</p>) : ('')}

                                    </div>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.onSubmit} className="form-edit-profile">

                                        <div className="row form">

                                            <div className="col-sm-3">
                                                <strong><i className="fas fa-user"></i> Nome:</strong>
                                            </div>

                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={this.state.readOnly}
                                                    type="text"
                                                    name="name"
                                                    pattern="^[A-Za-zÀ-ú\s]+$"
                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                    value={this.state.readOnly ? this.state.user.name : this.state.newUser.name}
                                                    onChange={(e) => this.setState({ newUser: { ...this.state.newUser, name: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row form">
                                            <div className="col-sm-3">
                                                <strong><i className="fas fa-calendar-alt"></i> Nascimento:</strong>
                                            </div>
                                            {this.state.readOnly ? (
                                                <div className="col-sm-9">
                                                    <input
                                                        readOnly={true}
                                                        type="text"
                                                        className={`profile-inputs`}
                                                        value={this.state.user.age ? new Date(this.state.user.age).toLocaleDateString('pt-br') : ''}
                                                    />



                                                </div>) :
                                                (
                                                    <input
                                                        type="date"
                                                        name="age"
                                                        max={this.maxDate}
                                                        className={`profile-inputs edit-date`}
                                                        value={this.state.newUser.age ? new Date(this.state.newUser.age).toISOString().split('T')[0] : ''}
                                                        onChange={(e) => this.setState({ newUser: { ...this.state.newUser, age: e.target.value } })}
                                                    />
                                                )
                                            }
                                        </div>
                                        <hr />

                                        <div className="row form">
                                            <div className="col-sm-3">
                                                <strong><i className="fas fa-envelope"></i> Email:</strong>
                                            </div>

                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={this.state.readOnly}
                                                    type="email"
                                                    name="email"
                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                    value={this.state.readOnly ? this.state.user.email : this.state.newUser.email}
                                                    onChange={(e) => this.setState({ newUser: { ...this.state.newUser, email: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row form">
                                            <div className="col-sm-3">
                                                <strong><i className="fas fa-phone"></i> Telefone:</strong>
                                            </div>

                                            <div className="col-sm-9">
                                                <InputMask
                                                    mask="(99) 99999-9999"
                                                    maskChar=""
                                                    type="tel"
                                                    name="phone_number"
                                                    className={`profile-inputs ${!this.state.readOnly ? 'edit' : ''}`}
                                                    placeholder="(99) 99999-9999"
                                                    value={this.state.readOnly ? this.state.user.phone_number : this.state.newUser.phone_number}
                                                    readOnly={this.state.readOnly}
                                                    onChange={(e) => this.setState({ newUser: { ...this.state.newUser, phone_number: e.target.value } })}
                                                />

                                            </div>
                                        </div>
                                        <hr />
                                        <div className={`row form  ${!this.state.readOnly ? 'show' : 'hide'}`}>
                                            <div className="col-sm-3">
                                                <strong><i className="fa fa-lock"></i> Senha antiga:</strong>
                                            </div>

                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="oldPassword"
                                                    title="Senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                                                    className={`profile-inputs edit`}
                                                    value={this.state.newUser.oldPassword || ''}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            newUser: {
                                                                ...this.state.newUser,
                                                                oldPassword: e.target.value
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                            <hr />

                                        </div>
                                        {!this.state.readOnly ? (<div className="row form">

                                            <div className="col-sm-3">
                                                <strong><i className="fa fa-lock"></i> Nova senha:</strong>
                                            </div>

                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    name="password"
                                                    title="Senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
                                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
                                                    className={`profile-inputs edit`}
                                                    onChange={(e) => this.setState({ newUser: { ...this.state.newUser, password: e.target.value } })}
                                                />
                                            </div>

                                        </div>) :
                                            (<div className="row form">
                                                <div className="col-sm-3">

                                                    <strong> <i className="fa fa-lock"></i> Senha:</strong>

                                                </div>
                                                <div className="col-sm-9">
                                                    <input
                                                        readOnly={true}
                                                        type="password"
                                                        name="password"
                                                        className={`profile-inputs`}
                                                        value=""
                                                    />
                                                </div>

                                            </div>)
                                        }
                                        <hr />

                                        <div className={`row form ${!this.state.readOnly ? 'hide' : ''}`}>

                                            <div className={`col-sm-3`}>
                                                <strong> <i className="fa-solid fa-medal"></i> Pontuação:</strong>
                                            </div>

                                            <div className="col-sm-9">
                                                <input
                                                    readOnly={true}
                                                    type="number"
                                                    className={`profile-inputs `}
                                                    value={this.state.user.score}
                                                    onChange={(e) => this.setState({ user: { ...this.state.user, score: e.target.value } })}
                                                />
                                            </div>
                                        </div>


                                        <div className="row buttons" style={{ marginTop: '15px' }}>
                                            <div className="col-sm-12">
                                                <div className="profile-group-buttons">
                                                    <button type="button" className="btn btn-edit" onClick={() => this.toggleEditForm()}>{this.state.readOnly ? ('Editar') : ('Cancelar')}</button>
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
                        <div className="col-xs-12 col-md-12 col-lg-8">
                            <div className="panel panel-default " id="panel-content" style={{ marginBottom: '15px', }}>
                                <div className="panel-body text-center">
                                    <div className="col-md-12">
                                        <h1 className="title">Minhas Candidaturas</h1>
                                        <hr />

                                        {this.state.user && this.state.user.applications && this.state.user.applications.length ? (
                                            this.state.user.applications.map((application, index) => {

                                                return (
                                                    <div className="col-xs-12 col-md-6 col-lg-4" id="columnCard" key={index}>
                                                        <div className="card-custom profile">
                                                            <div>
                                                                <div className="card-header">
                                                                    <img className="img-card" src={Logo} alt="Logo" />

                                                                </div>
                                                                <h3 className="card-title">{application.vacancy.title}</h3>

                                                            </div>

                                                            <div className="card-content">

                                                                <p className="card-text">
                                                                    <i className="fa-solid fa-hospital"></i>
                                                                    <strong> Hospital:</strong> {application.vacancy.hospital.name}
                                                                </p>
                                                                <p className="card-text">
                                                                    <i className="fa-solid fa-location-dot"></i>
                                                                    <strong> Endereço:</strong> {application.vacancy.hospital.address}
                                                                </p>

                                                                <p className="card-text">
                                                                    <i className="fa fa-calendar"></i>
                                                                    <strong> Data:</strong> {new Date(application.vacancy.schedule).toLocaleString('pt-BR')}
                                                                </p>
                                                                <p className="card-text">
                                                                    <i className="fa fa-clipboard"></i>
                                                                    <strong> Descrição:</strong> {application.vacancy.description}
                                                                </p>
                                                                <p className="card-text">
                                                                    <i className="fa fa-award"></i>
                                                                    <strong> Pontos:</strong> {application.vacancy.score}
                                                                </p>
                                                                <p className="card-text">
                                                                    <i className="fa fa-tag"></i>
                                                                    <strong> Situação:</strong> {application.status == 'Pending' ? 'Pendente' : `Aprovado. Comparecer ao local na data ${new Date(application.vacancy.schedule).toLocaleString('pt-BR')}`}
                                                                </p>

                                                                <div className="card-buttons">
                                                                    {application.status == 'Pending' && (
                                                                        <a className="btn" onClick={() => this.openModal(application)}>Cancelar inscrição</a>

                                                                    )}
                                                                </div>
                                                                
                                                            </div>

                                                        </div>

                                                    </div>


                                                );
                                            })
                                        ) : (
                                            <div className="no-content">
                                                <h1>Nenhuma vaga disponível no momento...</h1>
                                            </div>
                                        )}
                                        {this.state.showForm && (
                                            <div className="confirm-modal">

                                                <div className="modal-content">

                                                    <div>
                                                        <h1 className="modal-title">Cancelar Candidatura?</h1>
                                                        <p className="modal-description">Você deseja realmente cancelar sua candidatura para a vaga "{this.state.application.vacancy.title}"?</p>
                                                    </div>


                                                    <div className="modal-buttons">
                                                        <button onClick={() => this.closeModal()}>Cancelar</button>
                                                        <button onClick={() => this.cancelApplication()}>Confirmar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

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
