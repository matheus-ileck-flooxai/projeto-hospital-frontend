import React, { Component, use } from "react";
import Axios from "axios";

class usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vacancies: []
        };
    }
    componentDidMount() {
        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies`)
            .then(resp => {
                this.setState({ vacancies: resp.data })

            })
            .catch(err => {
                console.log(err.message);

            })
    }



    render() {
        let vacancies = this.state.vacancies
        console.log(vacancies);

        return (

            <div className="content">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Voluntarios necessarios</th>
                            <th>Pontos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacancies.map((vacancy, index) =>
                            <tr key={vacancy.id}>
                                <td>{index + 1} </td>
                                <td>{vacancy.title} </td>
                                <td>{vacancy.description}</td>
                                <td>{new Date(vacancy.schedule).toLocaleDateString('pt-BR')}</td>

                                <td>{vacancy.qtd_volunteer}</td>
                                <td>{vacancy.score}</td>
                                <td className="table-buttons">
                                    <button>Editar</button>
                                    <button>Excluir</button>
                                </td>

                            </tr>
                        )
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default usuarios