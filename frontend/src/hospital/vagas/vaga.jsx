import React, { Component, use } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

class vacancies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vacancies: [],
            vacancy: {},
            showForm: false,
        };
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        this.getVacancies()
    }
    getVacancies() {
        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies`)
            .then(resp => {
                this.setState({ vacancies: resp.data })

            })
            .catch(err => {
                console.log(err.message);

            })
    }
    onSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const hospitalid = decodedToken.hospitalId;
        const formData = new FormData(e.target);

        const vacancy = {
            title: formData.get('title'),
            description: formData.get('description'),
            userId: 1,
            qtd_volunteer: formData.get('qtd_volunteer'),
            schedule: new Date(formData.get('schedule')),
            score: formData.get('score'),
            hospitalId: hospitalid
        }
        Axios.post('http://localhost:3306/api/vacancies', vacancy, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                this.setState(state => ({
                    vacancies: [...state.vacancies, resp.data.newVacancy],
                    showForm: false
                }));
                console.log(this.state.vacancies);

            })
            .catch(err => {
                console.error(err);
            });

    }



    render() {
        let vacancies = this.state.vacancies

        return (

            <div className="content">
                {!this.state.showForm && (
                    <div>
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
                        <button className="new-data-button" onClick={() => this.setState({ showForm: true })} >Criar nova vaga</button>

                    </div>
                )}
                {this.state.showForm && (<form className="form" onSubmit={this.onSubmit}>
                    <h2>Insira os dados da vaga</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Titulo</label>
                            <input type="text" name="title" required
                            />
                        </div>


                        <div className="form-group">
                            <label>Data</label>
                            <input type="date" name="schedule" required
                            />
                        </div>

                        <div className="form-group">
                            <label>Voluntarios necessarios</label>
                            <input type="number" name="qtd_volunteer" required min={1}
                            />
                        </div>
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" name="description" required

                            />
                        </div>
                        <div className="form-group">
                            <label>Pontos</label>
                            <input type="number" name="score" required

                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <button type="button" className="cancel-button" onClick={() => this.setState({ showForm: false, vacancy: {} })}>Cancelar</button>
                        <button type="submit" className="submit-button">Enviar</button>
                    </div>
                </form>
                )}
            </div>
        );
    }
}

export default vacancies