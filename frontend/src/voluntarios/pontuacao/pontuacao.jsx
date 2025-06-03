import Axios from "axios";
import React, { Component, use } from "react";
import './pontuacao.css'
import Alert from "react-s-alert"
const jwt_decode = require('jwt-decode');

export default class leaderboard extends Component {

    constructor() {
        super();
        this.state = {
            leaderboard: []
        }

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

        Axios.get('https://projeto-hospital-backend-production.up.railway.app/api/leaderboard')
            .then(resp => {
                this.setState({ leaderboard: resp.data.users })
            })
            .catch(err => {
                this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

            });
    }

    render() {
        const token = localStorage.getItem('token');
        let leaderboard = this.state.leaderboard
        let user = null
        if (token) {
            const decoded = jwt_decode.jwtDecode(token)
            user = leaderboard.findIndex(user => user.id == decoded.userid)
            console.log(leaderboard);

        }


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
                                leaderboard.slice(0, 10).map((user, index) => (
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
                            <hr />

                            {token && user > 10 && (

                                <li className="table-row">

                                    <div className="col col-1" data-label="Rank">{user}</div>
                                    <div className="col col-2" data-label="Name">{leaderboard[user].name}</div>
                                    <div className="col col-3" data-label="Score">{leaderboard[user].score}</div>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}  