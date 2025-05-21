import React, { Component, use } from "react";
import Axios from "axios";
import './usuarios.css'
import { jwtDecode } from "jwt-decode";

class usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showForm: false,
            showFormEdit: false,
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
                console.log(err.message);

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
            Axios.post('https://projeto-hospital-backend-production.up.railway.app/api/users', User, {
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
        Axios.delete(`https://projeto-hospital-backend-production.up.railway.app/api/users/${id}`, {

        }).then(() => this.getusers());

    }




    render() {
        let users = this.state.users
        return (

            <div className="content">
                {!this.state.showForm && (
                    <div>
                        <button className="new-user-button" onClick={() => this.setState({ showForm: true })} >Novo usuario</button>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) =>
                                    <tr key={user.id}>
                                        <td>{index}</td>
                                        <td>{user.name} </td>
                                        <td>{user.email}</td>
                                        <td className="table-buttons">
                                            <button onClick={() => this.setState({ showForm: true, User: user })}>Editar</button>
                                            <button onClick={() => this.onDelete(user.id)}>Excluir</button>
                                        </td>

                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                )}
                {this.state.showForm && (
                    <form className="form" onSubmit={this.onSubmit}>
                        <h2>Insira os dados do novo usuário</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" name="name" required
                                    value={this.state.User ? this.state.User.name : ''}
                                    onChange={e => this.setState({
                                        User: {
                                            ...this.state.User,
                                            name: e.target.value
                                        }
                                    })} />
                            </div>

                            <div className="form-group">
                                <label>Telefone</label>
                                <input type="tel" name="phone" required
                                    value={this.state.User ? this.state.User.phone_number : ''}
                                    onChange={e => this.setState({
                                        User: {
                                            ...this.state.User,
                                            phone_number: e.target.value
                                        }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Data de nascimento</label>
                                <input type="date" name="age" required
                                    value={this.state.User ? this.state.User.age : ''}
                                    onChange={e => this.setState({
                                        User: {
                                            ...this.state.User,
                                            age: e.target.value
                                        }
                                    })} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" required
                                    value={this.state.User ? this.state.User.email : ''}
                                    onChange={e => this.setState({
                                        User: {
                                            ...this.state.User,
                                            email: e.target.value
                                        }
                                    })} />
                            </div>

                            {!this.state.User.id && (<div className="form-group">
                                <label>Senha</label>
                                <input type="password" name="password" required
                                    value={this.state.User ? this.state.User.pass : ''}
                                    readOnly={this.state.user} />
                            </div>
                            )}
                        </div>

                        <div className="form-row">
                            <button type="button" onClick={() => this.setState({ showForm: false, User: {} })}>Cancelar</button>
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                )}

            </div>
        );
    }
}

export default usuarios