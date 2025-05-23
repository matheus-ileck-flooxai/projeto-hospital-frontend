import React, { Component, use } from "react";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";

class vacancies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vacancies: [],
            Vacancy: {},
            showForm: false,
        };

        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        this.getVacancies()
    }
    getVacancies() {
        const token = localStorage.getItem('token');

        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                this.setState({ vacancies: resp.data })
                ;


            })
            .catch(err => {
                ;

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
            qtd_volunteer: formData.get('qtd_volunteer'),
            schedule: new Date(formData.get('schedule')),
            score: formData.get('score'),
            hospitalId: hospitalid
        }

        if (this.state.Vacancy.id) {
            Axios.put(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies/${this.state.Vacancy.id}`, vacancy, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.getVacancies()
                this.setState({
                    showForm: false,
                    Vacancy: {}
                })
            })
        }
        else {
            Axios.post('https://projeto-hospital-backend-production.up.railway.app/api/vacancies', vacancy, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => {
                    this.setState(state => ({
                        vacancies: [...state.vacancies, resp.data.newVacancy],
                        showForm: false
                    }));

                })
                .catch(err => {
                    console.error(err);
                });

        }

    }

    onDelete(id) {
        const token = localStorage.getItem('token');

        Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getVacancies());

    }
    finishVacancy(id) {
        const status = 'concluded'
        const token = localStorage.getItem('token');

        Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies/${id}`, status,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getVacancies());

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
                                <th>Voluntarios inscritos</th>
                                <th>Pontos</th>
                                <th className="th-buttons">Ações</th>
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
                                    <td>{vacancy.applications ? vacancy.applications.length : 0}</td>
                                    <td>{vacancy.score}</td>
                                    <td className="table-buttons">
                                        <div className="table-buttons-group">
                                            <i className="fas fa-edit" onClick={() => this.setState({ showForm: true, Vacancy: vacancy })}></i>
                                            <i className="fas fa-trash" onClick={() => this.onDelete(vacancy.id)}></i>
                                            <i className="fas fa-check" onClick={() => this.finishVacancy(vacancy.id)}></i>
                                        </div>
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
                            value={this.state.Vacancy ? this.state.Vacancy.title : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    title: e.target.value
                                }
                            })}
                        />
                    </div>


                    <div className="form-group">
                        <label>Data</label>
                        <input type="date" name="schedule" required

                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    schedule: e.target.value
                                }
                            })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Voluntarios necessarios</label>
                        <input type="number" name="qtd_volunteer" required min={1}
                            value={this.state.Vacancy ? this.state.Vacancy.qtd_volunteer : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    qtd_volunteer: e.target.value
                                }
                            })}
                        />
                    </div>
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label>Descrição</label>
                        <input type="text" name="description" required
                            value={this.state.Vacancy ? this.state.Vacancy.description : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    description: e.target.value
                                }
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pontos</label>
                        <input type="number" name="score" required
                            value={this.state.Vacancy ? this.state.Vacancy.score : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    score: e.target.value
                                }
                            })}
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