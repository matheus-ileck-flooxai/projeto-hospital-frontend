import React, { Component } from "react";
import Axios from "axios";
import './usuarios.css'
import { jwtDecode } from "jwt-decode";

class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showForm: false,
            User: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.getusers()
    }
    getusers() {
        const token = localStorage.getItem('token')

        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/hospital/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {

                this.setState({ users: resp.data });


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

        const User = {
            name: formData.get('name'),
            phone_number: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: new Date(formData.get('age')),
            role: 'Admin',
            hospitalId: hospitalid
        };
        if (this.state.User.id) {
            Axios.put(`https://projeto-hospital-backend-production.up.railway.app/api/users/${this.state.User.id}`, User, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.getusers()
                this.setState({
                    showForm: false,
                    User: {}
                })
            })
        }
        else {
            Axios.post(`https://projeto-hospital-backend-production.up.railway.app/api/users`, User, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => {
                    this.setState(state => ({
                        users: [...state.users, resp.data],
                        showForm: false
                    }));
                })
                .catch(err => {
                    console.error(err);
                });
        }

    };
    onDelete(id) {
        const token = localStorage.getItem('token')

        Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => this.getusers());

    }




    render() {
        let users = this.state.users
        return (

            <div className="content">
                {!this.state.showForm && (
                    <div>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Ações</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) =>
                                    <tr key={user.id}>
                                        <td>{index}</td>
                                        <td>{user.name} </td>
                                        <td>{user.email}</td>
                                        <td>{user.phone_number}</td>
                                        <td className="table-buttons">
                                            <div className="table-buttons-group">

                                                <i className="fas fa-edit" onClick={() => this.setState({ showForm: true, User: user })}></i>
                                                <i className="fas fa-trash" onClick={() => this.onDelete(user.id)}></i>
                                            </div>
                                        </td>

                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                        <button className="new-data-button" onClick={() => this.setState({ showForm: true })} >Novo usuario</button>

                    </div>
                )}
                {this.state.showForm && (

                    <form className="form-user" onSubmit={this.onSubmit}>
                        <h2>Insira os dados do novo usuário</h2>

                        <div className="grupo-inputs">
                            <label className="label">Nome:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Digite seu nome"
                                required
                                value={this.state.User ? this.state.User.name : ''}
                                onChange={e => this.setState({
                                    User: {
                                        ...this.state.User,
                                        name: e.target.value
                                    }
                                })}
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label className="label">Telefone:</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Digite seu telefone"
                                required
                                value={this.state.User ? this.state.User.phone_number : ''}
                                onChange={e => this.setState({
                                    User: {
                                        ...this.state.User,
                                        phone_number: e.target.value
                                    }
                                })}
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label className="label">Data de nascimento:</label>
                            <input
                                type="date"
                                name="age"
                                required
                                value={this.state.User ? this.state.User.age : ''}
                                onChange={e => this.setState({
                                    User: {
                                        ...this.state.User,
                                        age: e.target.value
                                    }
                                })}
                            />
                        </div>

                        <div className="grupo-inputs">
                            <label className="label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                required
                                value={this.state.User ? this.state.User.email : ''}
                                onChange={e => this.setState({
                                    User: {
                                        ...this.state.User,
                                        email: e.target.value
                                    }
                                })}
                            />
                        </div>

                        {!this.state.User.id && (
                            <div className="grupo-inputs">
                                <label className="label">Senha:</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Digite sua senha"
                                    required
                                    value={this.state.User ? this.state.User.pass : ''}
                                    readOnly={this.state.user}
                                    onChange={e => this.setState({
                                        User: {
                                            ...this.state.User,
                                            pass: e.target.value
                                        }
                                    })}
                                />
                            </div>
                        )}

                        <div className="grupo-inputs button">
                            <button type="button" className="cancel-button" onClick={() => this.setState({ showForm: false, User: {} })}>Cancelar</button>
                            <button type="submit" className="btn-submit">Enviar</button>
                        </div>
                    </form>


                )}

            </div>
        );
    }
}

export default users