import React, { Component } from "react"
import Logo from '../../template/assets/img/logo2.png'
import firstImage from '../../template/assets/img/img1.png'
import Axios from "axios"
import './vagas.css'
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
        Axios.get(`http://localhost:3306/api/vacancies`, {

        })
            .then(resp => {
                this.setState({ vacancies: resp.data });

                console.log(this.state.vacancies);



            })
            .catch(err => {

            })
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

                    <section className="about">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6 mb-4">
                                <h2 className="title about-title"><span className="span-border">Quem somos</span></h2>
                                <div className="about-text">
                                    <p>
                                        Somos uma plataforma com o intuito de mobilizar pessoas atraves de serviços voluntarios para ajudar pacientes em diversos hospitais.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4">
                                <img src={firstImage} className="img-responsive" alt="" />
                            </div>
                        </div>
                    </section>

                    <section className="vacancies">
                        <div className="row">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="title"><span className="span-border">Vagas disponiveis</span></h1>
                                    <div className="row">
                                        <h4 className="title-vacancies">Entre e venha participar da nossa historia</h4>

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
                                            <div className="card-content">
                                                <h3 className="card-title">{vacancy.title}</h3>
                                                <p className="card-text">Descrição: {vacancy.description}</p>
                                                <p className="card-text">Voluntarios necessarios: {vacancy.qtd_volunteer}</p>
                                                <p className="card-text">Data: {new Date(vacancy.schedule).toLocaleDateString('pt-BR')}</p>
                                                <p className="card-text">Pontos: {vacancy.score}</p>
                                            </div>
                                            <div className="card-buttons">
                                                <button className="btn">Participar</button>
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
