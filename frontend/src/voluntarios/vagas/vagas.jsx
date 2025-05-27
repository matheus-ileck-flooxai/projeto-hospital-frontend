import React, { Component } from "react"
import Logo from '../../template/assets/img/logo2.png'
import firstImage from '../../template/assets/img/img1.png'
import Axios from "axios"
import './vagas.css'
const jwt_decode = require('jwt-decode');

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

            Axios.get(`http://localhost:3306/api/vacancies?userId=${userId}`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });
                    console.log(this.state.vacancies);
                    
                })
                .catch(error => {
                    console.error('Erro ao buscar vagas');
                });
        } else {
            Axios.get(`http://localhost:3306/api/vacancies`)
                .then(resp => {
                    this.setState({ vacancies: resp.data });
                })
                .catch(error => {
                    console.error('Erro ao buscar todas as vagas', err);
                });
        }
    }



    onsubmit(vacancyId) {

        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode.jwtDecode(token)
            const userId = decoded.userid

            Axios.post('http://localhost:3306/api/volunteer/newapplication', { userId, vacancyId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.getVacancies();
            })
                .catch(error => {
                    {
                        console.log(error);

                    }
                })
        }
    }

    render() {
        let vacancies = this.state.vacancies

        return (


            <div className="row">
                <div className="jumbotron" id="inicio">
                    <div className="col-md-12">
                        <h2 className="title-jumbotron">Seja bem vindo a plataforma de voluntarios!</h2>
                    </div>
                </div>
                <div className="container">

                    <section className="about" id="about">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6 mb-4">
                                <h2 className="title about-title"><span className="span-border">Quem somos</span></h2>
                                <div className="about-text">
                                    <p>
                                        Somos uma plataforma com  feita com o intuito de mobilizar pessoas através de serviços voluntários para ajudar pacientes de todos os hospitais de qualquer lugar do mundo!

                                        Nós contamos com mais de  hospitais registrados onde você pode escolher se voluntariar no mais próximo de sua casa, podendo ajudar em tarefes de todo tipo. Venha fazer a diferença na vida das pessoas!
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

                            <div className="row">
                                {vacancies.map((vacancy, index) =>

                                    <div className="col-sm-6 col-md-4">
                                        <div className="card-custom">
                                            <div className="card-header">
                                                <img src={Logo} className="img-card"></img>
                                            </div>
                                            <div className="card-content" >
                                                <h3 className="card-title">{vacancy.title}</h3>
                                                <p className="card-text"><i className="fa fa-clipboard"></i><strong> Descrição:</strong> {vacancy.description}</p>
                                                <p className="card-text"><i className="fa fa-users"></i><strong> voluntários necessarios:</strong> {vacancy.applications.length}/{vacancy.qtd_volunteer}</p>
                                                <p className="card-text"><i className="fa fa-calendar"></i><strong> Data:</strong> {new Date(vacancy.schedule).toLocaleDateString('pt-BR')}</p>
                                                <p className="card-text"><i className="fa fa-award"></i><strong> Pontos:</strong> {vacancy.score}</p>
                                            </div>
                                            <hr />
                                            <div className="card-buttons">
                                                <a className="btn" onClick={() => this.onsubmit(vacancy.id)} >Participar</a>
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
