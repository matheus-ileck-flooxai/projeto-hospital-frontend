import React, { Component } from "react"
import Logo from '../../template/assets/img/logo2.png'
import firstImage from '../../template/assets/img/img1.png'
import Axios from "axios"
import './vagas.css'
const jwt_decode = require('jwt-decode');
import { hashHistory } from 'react-router'


export default class Vagas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vacancies: [],
            Vacancy: {},
            showForm: false,
        };



    }

    componentDidMount() {
        this.getVacancies();

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
                .catch(error => {
                    console.error(error);
                });
        } else {
            Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });
                })
                .catch(error => {
                    console.error('Erro ao buscar todas as vagas', error);
                });
        }
    }



    onsubmit() {

        const token = localStorage.getItem('token');
        const decoded = jwt_decode.jwtDecode(token)

        if (token && decoded.role == 'Volunteer') {
            const userId = decoded.userid
            const vacancyId = this.state.Vacancy.id
            Axios.post(`https://projeto-hospital-backend-production.up.railway.app/api/volunteer/newapplication`, { userId, vacancyId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.setState({ showForm: false })
                this.getVacancies();
            }).catch(error => {
                {
                    console.log(error);
                }
            })
        }
        else {
            hashHistory.push('/user/auth')
        }

    }
    openModal(vacancy) {
        const token = localStorage.getItem('token');

        if (token) {
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
            Vacancy: ''
        });
    }
    render() {
        let vacancies = this.state.vacancies

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
                            <div className="col-12 col-md-6  mb-4">
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
                                    </div>
                                </div>

                            </div>   
                             

                            {/*VAGAS DISPONIVEIS*/}
                            <div className="row justify-content-center">

                                {this.state.vacancies && this.state.vacancies.length > 0 ? (
                                    vacancies.map((vacancy, index) => (
                                        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4" key={index}>
                                            <div className="card-custom">
                                                <div className="card-header">
                                                    <img src={Logo} className="img-card" alt="Logo" />
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="card-title">{vacancy.title}</h3>
                                                    <p className="card-text"><i className="fa-solid fa-hospital"></i><strong> Hospital:</strong> {vacancy.hospital.name}</p>
                                                    <p className="card-text"><i className="fa-solid fa-location-dot"></i><strong> Endereço:</strong> {vacancy.hospital.address}</p>
                                                    <p className="card-text"><i className="fa fa-users"></i><strong> Voluntários necessários:</strong> {vacancy.applications.length}/{vacancy.qtd_volunteer}</p>
                                                    <p className="card-text"><i className="fa fa-calendar"></i><strong> Data:</strong> {new Date(vacancy.schedule).toLocaleDateString('pt-BR')}</p>
                                                    <p className="card-text"><i className="fa fa-clipboard"></i><strong> Descrição:</strong> {vacancy.description}</p>
                                                    <p className="card-text"><i className="fa fa-award"></i><strong> Pontos:</strong> {vacancy.score}</p>
                                                </div>
                                                <div className="card-buttons">
                                                    <a className="btn" onClick={() => this.openModal(vacancy)}>Participar</a>
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
                                            <h1 className="modal-title">Confirmar inscrição?</h1>
                                            <p className="modal-description">Você deseja se inscrever na vaga: {this.state.Vacancy.title}</p>
                                            <div className="modal-buttons">
                                                <button onClick={() => this.closeModal()}>Cancelar</button>
                                                <button onClick={() => this.onsubmit()}>Enviar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>


                        </div>
                    </section>
                </div>


            </div>
        )
    }
}
