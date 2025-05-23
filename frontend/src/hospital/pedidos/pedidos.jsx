import React, { Component, use } from "react";
import Axios from "axios";

class Pedidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applications: []
        };

    }
    componentDidMount() {
        this.getApplications()
    }
    getApplications() {
        const token = localStorage.getItem('token');

        Axios.get(`http://localhost:3306/api/applications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                this.setState({ applications: resp.data })

            })
            .catch(err => {
                ;

            })
    }
    onDelete(applicationId) {
        const token = localStorage.getItem('token');
        Axios.delete(`http://localhost:3306/api/applications/${applicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getApplications());
    }
    onUpdate(id) {
        const token = localStorage.getItem('token');
        id;


        Axios.put(`http://localhost:3306/api/applications/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getApplications());
    }



    render() {
        let applications = this.state.applications
        return (

            <div className="content">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Vaga</th>
                            <th>Horario</th>
                            <th>Pontos</th>
                            <th>Status</th>

                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application, index) =>
                            <tr key={application.id}>
                                <td>{index}</td>
                                <td>{application.user.name} </td>
                                <td>{application.user.email}</td>
                                <td>{application.user.phone_number}</td>
                                <td>{application.vacancy.title}</td>
                                <td>{new Date(application.vacancy.schedule).toLocaleTimeString('pt-BR')}</td>
                                <td>{application.vacancy.score}</td>
                                <td>{application.status}</td>

                                <td className="table-buttons">
                                    <div className="table-buttons-group">
                                        <i className="fas fa-trash" onClick={() => this.onDelete(application.id)}></i>
                                        <i className="fas fa-check" onClick={() => this.onUpdate(application.id)}></i>
                                    </div>
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

export default Pedidos