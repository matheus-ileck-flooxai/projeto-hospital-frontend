import Axios from "axios";
import React, { Component, use } from "react";
import './pontuacao.css'
export default class leaderboard extends Component {

    constructor() {
        super();
        this.state = {
            leaderboard: []
        }

    }
    componentDidMount() {
        Axios.get('https://projeto-hospital-backend-production.up.railway.app/api/leaderboard')
            .then(resp => {
                this.setState({ leaderboard: resp.data.users })
            })
    }

    render() {
        let leaderboard = this.state.leaderboard

        return (

            <section className="main">
                <div className="row ">
                    <div className="leaderboard">
                        <div className="header-leaderboard">
                            <h1>Tabela com os 10 melhores voluntarios</h1>
                        </div>
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Rank</div>
                                <div className="col col-2">Voluntário</div>
                                <div className="col col-3">Pontuação</div>
                            </li>
                            {this.state.leaderboard.length > 0 ? (
                                leaderboard.map((user, index) => (
                                    <li className="table-row" key={index}>
                                        <div className="col col-1" data-label="Rank" >{index + 1}</div>
                                        <div className="col col-2" data-label="Name">{user.name}</div>
                                        <div className="col col-3" data-label="Score">{user.score}</div>
                                    </li>

                                ))
                            ) :
                                (
                                    <div className="no-content">
                                        <h1>Ranking não disponivel...</h1>
                                    </div>
                                )

                            }
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}  