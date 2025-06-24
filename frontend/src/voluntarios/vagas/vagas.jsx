import React, { Component } from "react";
import Axios from "axios";
import Logo from '../../template/assets/img/logo2.png'
import Alert from "react-s-alert"
import InputMask from 'react-input-mask';

const jwt_decode = require('jwt-decode');


export default class Vagas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancies: [],
            Vacancy: {},
            showForm: false,
            cancel: false,
            leaderboard: []
        }
        this.date = new Date()
        this.maxDate = new Date(
            this.date.getFullYear() - 18,
            this.date.getMonth(),
            this.date.getDate()
        ).toISOString().split('T')[0];


    }

    alert(msg, error = false) {

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
        this.getVacancies()

    }

    getVacancies() {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode.jwtDecode(token);
            const userId = decoded.userid;

            Axios.get(`https://backend-hospital-production.up.railway.app/api/vacancies?userId=${userId}`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });

                })
                .catch(err => {
                    this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

                });
        } else {
            Axios.get(`https://backend-hospital-production.up.railway.app/api/vacancies`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });
                })
                .catch(err => {
                    this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

                });
        }
    }




    onsubmit() {

        const token = localStorage.getItem('token');
        const decoded = jwt_decode.jwtDecode(token)

        if (token && decoded.role == 'Volunteer') {
            const userId = decoded.userid
            const vacancyId = this.state.Vacancy.id


            if (this.state.cancel) {

                const application = this.state.Vacancy.applications.find(app => app.userId === userId);
                const idApplication = application.id


                Axios.delete(`https://backend-hospital-production.up.railway.app/api/volunteer/cancelapplication/${idApplication}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(resp => {
                        this.closeModal();
                        this.getVacancies();
                        this.alert('Candidatura cancelada com sucesso!')

                    })
            }
            else {
                Axios.post(`https://backend-hospital-production.up.railway.app/api/volunteer/newapplication`, { userId, vacancyId }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(resp => {
                    this.setState({ showForm: false })
                    this.alert('candidatura à vaga realizada com sucesso')

                    this.getVacancies();
                }).catch(error => {
                    {
                        console.error(error);
                    }
                })
            }


        }
        else {
            hashHistory.push('/user/auth')
        }

    }

    openModal(cancel = false, vacancy) {
        const token = localStorage.getItem('token');

        if (token) {
            if (cancel) {
                this.setState({
                    cancel: true
                });
            }
            this.setState({
                showForm: true,
                Vacancy: vacancy
            });
        }
        else {
            hashHistory.push('/user/auth')

        }


    }
    closeModal() {
        this.setState({
            showForm: false,
            cancel: false,
            Vacancy: {}
        });
    }
    render() {
        let vacancies = this.state.vacancies
        const token = localStorage.getItem('token');
        let userId = null;

        if (token) {
            const decoded = jwt_decode.jwtDecode(token);
            userId = decoded.userid;
        }
        return (
            <div className="container-fluid profile-content">
                <div className="main-body">
                    <div className="row">
                        <div className="col-xs-12 col-md-12 col-lg-12">
                            <div className="panel panel-default " id="panel-content" style={{ marginBottom: '15px', }}>
                                <div className="panel-body text-center">
                                    <div className="col-md-12">
                                        <h1 className="title">Vagas</h1>
                                        <hr />

                                        {this.state.vacancies && this.state.vacancies.length > 0 ? (
                                            this.state.vacancies.map((vacancy, index) => (
                                                <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4" key={index}>
                                                    <div className="card-custom">
                                                        <div>
                                                            <div className="card-header">
                                                                <img src={Logo} className="img-card" alt="Logo" />
                                                            </div>
                                                            <h3 className="card-title">{vacancy.title}</h3>

                                                        </div>

                                                        <div className="card-content">
                                                            <p className="card-text"><i className="fa-solid fa-hospital"></i><strong> Hospital:</strong> {vacancy.hospital.name}</p>
                                                            <p className="card-text"><i className="fa-solid fa-location-dot"></i><strong> Endereço:</strong> {vacancy.hospital.address}</p>
                                                            <p className="card-text"><i className="fa fa-users"></i><strong> Voluntários necessários:</strong> {vacancy.applications.length}/{vacancy.qtd_volunteer}</p>
                                                            <p className="card-text"><i className="fa fa-calendar"></i><strong> Data:</strong> {new Date(vacancy.schedule).toLocaleString('pt-BR')}</p>
                                                            <p className="card-text"><i className="fa fa-clipboard"></i><strong> Descrição:</strong> {vacancy.description}</p>
                                                            <p className="card-text"><i className="fa fa-award"></i><strong> Pontos:</strong> {vacancy.score}</p>
                                                        </div>
                                                        <div className="card-buttons">
                                                            {token ? (
                                                                vacancy.applications.some(application => application.userId === userId) ? (
                                                                    <a className="btn" onClick={() => this.openModal(true, vacancy)}>Cancelar inscrição</a>
                                                                ) : (
                                                                    <a className="btn" onClick={() => this.openModal(false, vacancy)}>Candidatar</a>
                                                                )
                                                            ) : (
                                                                <a className="btn" onClick={() => this.openModal(false, vacancy)}>Candidatar</a>
                                                            )}

                                                        </div>
                                                    </div>

                                                </div>
                                            ))
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
                                                        <p className="modal-description">Você deseja realmente cancelar sua candidatura para a vaga "{this.state.Vacancy.title}"?</p>
                                                    </div>


                                                    <div className="modal-buttons">
                                                        <button onClick={() => this.closeModal()}>Cancelar</button>
                                                        <button onClick={() => this.onsubmit()}>Confirmar</button>
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

        )
    }

}