import React, { Component } from "react"
import Logo from '../../template/assets/img/logo2.png'
import firstImage from '../../template/assets/img/img1.png'
import Tabela from '../../template/assets/img/tabela.png'
import Axios from "axios"
import './vagas.css'
const jwt_decode = require('jwt-decode');
import { hashHistory } from 'react-router'
import Alert from "react-s-alert"

export default class Vagas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vacancies: [],
            Vacancy: {},
            showForm: false,
            cancel: false,
            leaderboard: []
        };



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
        this.getVacancies();
        this.getLeaderboard();

    }
    getVacancies() {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode.jwtDecode(token);
            const userId = decoded.userid;

            Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies?userId=${userId}`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });

                })
                .catch(err => {
                    this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

                });
        } else {
            Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });
                })
                .catch(err => {
                    this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

                });
        }
    }
    getLeaderboard() {

        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/leaderboard`)
            .then(resp => {
                this.setState({ leaderboard: resp.data });

            })
            .catch(err => {
                this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

            });

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


                Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/volunteer/cancelapplication/${idApplication}`, {
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
                Axios.post(`https://projeto-hospital-backend-production.up.railway.app/api/volunteer/newapplication`, { userId, vacancyId }, {
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


            <div className="row">
                <div className="jumbotron" id="inicio">
                    <div className="col-md-12">
                        <h2 className="title-jumbotron">Seja bem vindo a plataforma de Voluntários!</h2>
                    </div>
                </div>
                <div className="container">

                    <section className="about" id="about">
                        <div className="row align-items-center">
                            
                            <div className="col col-md-6  mb-4">
                                <h2 className="title about-title"><span className="span-border">Quem somos?</span></h2>
                                <div className="about-text">
                                    <p>
                                        Somos uma plataforma feita com o intuito de mobilizar pessoas através de serviços voluntários para ajudar pacientes de hospitais de qualquer lugar do mundo!

                                        Nós contamos com diversos hospitais registrados, onde você pode escolher se voluntariar no mais próximo de sua casa, podendo ajudar em tarefas de todo tipo. Venha fazer a diferença na vida das pessoas!
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4">
                                <img src={firstImage} className="img-responsive" alt="" />
                            </div>
                            
                        </div>
                    </section>


                    <section className="vacancies" id="vagas">
                        <div className="row">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="title"><span className="span-border">Vagas disponiveis</span></h1>
                                    <div className="row">
                                        <h4 className="title-vacancies">Aqui você pode encontrar as vagas nos hospitais, encontrando o mais próximo e quantos pontos você acumula ao concluir o programa. Candidate-se já!</h4>
                                        <hr />
                                        <div className="access-profile">
                                            <a className="form-user-title" href="#/volunteer/profile">Para ver todas as suas candidaturas acesse seu perfil aqui...</a>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="row justify-content-center">
                                {this.state.vacancies && this.state.vacancies.length > 0 ? (
                                    vacancies.map((vacancy, index) => (
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
                                            {token && this.state.cancel ? (
                                                <div>
                                                    <h1 className="modal-title">Cancelar Candidatura?</h1>
                                                    <p className="modal-description">Você deseja cancelar a candidatura na vaga: {this.state.Vacancy.title}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div>

                                                        <h1 className="modal-title">Confirmar inscrição?</h1>
                                                        <p className="modal-description">Você deseja se inscrever na vaga: {this.state.Vacancy.title}</p>
                                                    </div>
                                                )}

                                            <div className="modal-buttons">
                                                <button onClick={() => this.closeModal()}>Cancelar</button>
                                                <button onClick={() => this.onsubmit()}>Confirmar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>


                        </div>

                    </section>
                    <section className="leaderboard" id="leaderboard">
                        <div className="row">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <h1 className="title"><span className="span-border">Ranking</span></h1>

                                        <h4 className="title-vacancies">Nossa Plataforma possui uma ranking com os melhores voluntários com base na sua pontuação e dedicação com o nosso trabalho.</h4>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="leaderboard">
                                                <ul className="responsive-table">
                                                    <li className="table-header">
                                                        <div className="col col-1">Rank</div>
                                                        <div className="col col-2">Voluntário</div>
                                                        <div className="col col-3">Pontuação</div>
                                                    </li>
                                                    {this.state.leaderboard.users && this.state.leaderboard.users.slice(0, 5).map((user, index) => (
                                                        <li className="table-row" key={user.id || index}>
                                                            <div className="col col-1" data-label="Rank">{index + 1}</div>
                                                            <div className="col col-2" data-label="Name">{user.name}</div>
                                                            <div className="col col-3" data-label="Score">{user.score}</div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>


                                            <div className="access-leaderboard">
                                                <a className="btn form-user-title" href="#/volunteer/leaderboard">Para ver o ranking completo acesse aqui...</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>
                </div >



            </div >
        )
    }
}
