import React, { Component, use } from "react";
import './vaga.css'
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

        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/hospital/vacancies`, {
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
            Axios.post(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies`, vacancy, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => {
                    this.setState(state => ({
                        showForm: false,
                        Vacancy: {}
                    }));
                    this.getVacancies()


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
        const token = localStorage.getItem('token');


        Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/vacancies/${id}/conclude`, {
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
                        <div className="table-responsive">
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
                                            <td data-label="Index:">{index + 1} </td>
                                            <td data-label="Titulo:">{vacancy.title} </td>
                                            <td data-label="Desc:">{vacancy.description}</td>
                                            <td data-label="Data:">{new Date(vacancy.schedule).toLocaleString('pt-BR')}</td>
                                            <td data-label="Voluntários Necessarios:">{vacancy.qtd_volunteer}</td>
                                            <td data-label="Voluntários Candidatos:">{vacancy.applications ? vacancy.applications.length : 0}</td>
                                            <td data-label="Pontos:">{vacancy.score}</td>
                                            <td className="table-buttons">
                                                <div className="table-buttons-group">
                                                    <i className="fas fa-check" onClick={() => this.finishVacancy(vacancy.id)}></i>
                                                    <i className="fas fa-edit" onClick={() => this.setState({ showForm: true, Vacancy: vacancy })}></i>
                                                    <i className="fas fa-trash" onClick={() => this.onDelete(vacancy.id)}></i>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>

                        </div>
                        <button className="new-data-button" onClick={() => this.setState({ showForm: true })} >Criar nova vaga</button>

                    </div>
                )}
                {this.state.showForm && (<form className="form-vacancy" onSubmit={this.onSubmit}>
                    <h2>Insira os dados da vaga</h2>

                    <div className="grupo-inputs">
                        <label className="label">Título:</label>
                        <input
                            type="text"
                            name="title"
                            pattern="^[A-Za-zÀ-ú\s]+$"
                            placeholder="Digite o título da vaga"
                            required
                            value={this.state.Vacancy ? this.state.Vacancy.title : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    title: e.target.value
                                }
                            })}
                        />
                    </div>

                    <div className="grupo-inputs">
                        <label className="label">Data:</label>
                        <input
                            type="datetime-local"
                            name="schedule"
                            required
                           min={new Date().toISOString().slice(0,16)}
                            value={this.state.Vacancy ? this.state.Vacancy.schedule : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    schedule: e.target.value
                                }
                            })}
                        />
                    </div>

                    <div className="grupo-inputs">
                        <label className="label">Voluntários necessários:</label>
                        <input
                            type="text"
                            name="qtd_volunteer"
                            placeholder="Quantidade de voluntários"
                            required
                            inputMode="numeric"
                            pattern="[0-9]*"
                            min={1}
                            value={this.state.Vacancy ? this.state.Vacancy.qtd_volunteer : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    qtd_volunteer: e.target.value.replace(/\D/g, "")
                                }
                            })}
                        />
                    </div>
                    <div className="grupo-inputs">
                        <label className="label">Descrição:</label>
                        <textarea
                            name="description"
                            placeholder="Descreva a vaga"
                            maxLength="191"
                            required
                            className="input-description"
                            value={this.state.Vacancy ? this.state.Vacancy.description : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    description: e.target.value
                                }
                            })}
                        />
                    </div>

                    <div className="grupo-inputs">
                        <label className="label">Pontos:</label>
                        <input
                            type="number"
                            name="score"
                            placeholder="Pontuação da vaga"
                            required
                            value={this.state.Vacancy ? this.state.Vacancy.score : ''}
                            onChange={e => this.setState({
                                Vacancy: {
                                    ...this.state.Vacancy,
                                    score: e.target.value
                                }
                            })}
                        />
                    </div>

                    <div className="grupo-inputs button admin">
                        <button type="button" className="cancel-button" onClick={() => this.setState({ showForm: false, Vacancy: {} })}>Cancelar</button>
                        <button type="submit" className="btn-submit">Enviar</button>
                    </div>
                </form>


                )}
            </div>
        );
    }
}

export default vacancies