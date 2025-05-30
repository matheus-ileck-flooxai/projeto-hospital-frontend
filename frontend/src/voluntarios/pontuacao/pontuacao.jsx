import Axios from "axios";
import React, { Component } from "react";

export default class leaderboard extends Component {

    constructor() {
        super();
        this.state = {
            leaderboard: ''
        }

    }
    componentDidMount() {
        Axios.get('http://localhost:3306/api/leaderboard')
            .then(resp => {
                this.setState({leaderboard:resp.data.users}, () =>{
                    console.log(this.state.leaderboard);
                    
                })
            })
    }

    render() {
        return (

            <section className="main">
                <div className="row">
                    <h1>Tabela com os 10 melhores voluntarios</h1>

                </div>
            </section>
        )
    }
}  