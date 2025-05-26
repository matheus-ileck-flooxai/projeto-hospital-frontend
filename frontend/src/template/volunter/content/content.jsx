import React, { Component } from "react";
import './content.css'
import Logo from '../../assets/img/logo2.png'
import firstImage from '../../assets/img/img1.png'

export default class content extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="jumbotron" id="inicio">
                        <div className="col-md-12">
                            <h2 className="title-jumbotron">Seja bem vindo a plataforma de voluntarios!</h2>
                        </div>
                    </div>
                    <section className="about">
                        <div className="container">
                            <div className="row" id="row">
                                <div className="col-md-12 col-sm-12 col-lg-6 cols">
                                    <div className="row">
                                        <h2 className="title about-title"><span>Quem somos</span></h2>
                                    </div>
                                    <div className="row">

                                        <div className="about-text">
                                            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h3>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12 col-sm-12 col-lg-6 cols">
                                    <div className="row">
                                        <img src={firstImage} className="img-about" alt="" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="vacancies">
                        <div className="container">
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1 className="title">Vagas disponiveis</h1>
                                        <div className="row">
                                            <h4 className="title-vacancies">Temos diversas vagas disponiveis:</h4>

                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-sm-6 col-md-4">
                                        <div className="thumbnail">
                                            <img src={Logo} alt="..." className="img-card"></img>
                                            <div className="caption">
                                                <h3>Thumbnail label</h3>
                                                <p>...</p>
                                                <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div >
        )
    }
}