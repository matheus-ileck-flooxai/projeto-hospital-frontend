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

        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/applications`, {
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
        Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/applications/${applicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getApplications());
    }
    onUpdate(id) {
        const token = localStorage.getItem('token');
        id;


        Axios.put(`https://projeto-hospital-backend-production.up.railway.app/api/applications/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getApplications());
    }



    render() {
        let applications = this.state.applications
        return (

            <div className="content">
                <div className="table-responsive">

                    <table className="users-table" id="users-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Vaga</th>
                                <th>Horario</th>
                                <th>Status</th>

                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application, index) =>
                                <tr key={application.id}>
                                    <td data-label="Index:">{index + 1}</td>
                                    <td data-label="Nome do Voluntário:">{application.user.name} </td>
                                    <td data-label="Email:">{application.user.email}</td>
                                    <td data-label="Telefone:">{application.user.phone_number}</td>
                                    <td data-label="Vaga:">{application.vacancy.title}</td>
                                    <td data-label="Data:"> {new Date(application.vacancy.schedule).toLocaleDateString('pt-BR')}</td>
                                    <td data-label="Situação:">{application.status == 'Pending' ? 'Pendente' : 'Aprovado'}</td>

                                    <td className="table-buttons">
                                        <div className="table-buttons-group">
                                            <i className="fas fa-check" onClick={() => this.onUpdate(application.id)}></i>

                                            <i className="fas fa-trash" onClick={() => this.onDelete(application.id)}></i>
                                        </div>
                                    </td>

                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Pedidos