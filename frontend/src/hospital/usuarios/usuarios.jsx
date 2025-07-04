import React, { Component } from "react";
import Axios from "axios";
import './usuarios.css'
import { jwtDecode } from "jwt-decode";
import Alert from "react-s-alert"
import InputMask from 'react-input-mask';


class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showForm: false,
            User: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.date = new Date()
        this.maxDate = new Date(
            this.date.getFullYear() - 18,
            this.date.getMonth(),
            this.date.getDate()
        ).toISOString().split('T')[0];
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
        this.getusers()
    }


    getusers() {
        const token = localStorage.getItem('token')

        Axios.get(`https://backend-hospital-production.up.railway.app/api/hospital/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                this.setState({ users: resp.data });


            })
            .catch(err => {
                this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

            });
    }

    onSubmit(e) {

        e.preventDefault()
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const hospitalid = decodedToken.hospitalId;

        const formData = new FormData(e.target);

        const User = {
            name: formData.get('name'),
            phone_number: formData.get('phone_number'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: new Date(formData.get('age')),
            role: 'Admin',
            hospitalId: hospitalid
        };
        if (this.state.User.id) {
            Axios.put(`https://backend-hospital-production.up.railway.app/api/users/${this.state.User.id}`, User, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(resp => {
                this.getusers()
                this.setState({
                    showForm: false,
                    User: {},
                })
                this.alert('Usuário atualizado com sucesso!')
            }).catch(err => {
                this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

            });
        }
        else {
            Axios.post(`https://backend-hospital-production.up.railway.app/api/users`, User, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => {
                    this.setState(state => ({
                        users: [...state.users, resp.data],
                        showForm: false,
                    }));
                    this.alert('Usuário cadastrado com sucesso!')

                })
                .catch(err => {
                    this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

                });
        }

    };
    onDelete(id) {
        const token = localStorage.getItem('token')

        Axios.delete(`https://backend-hospital-production.up.railway.app/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            this.getusers()
            this.alert('Usuário removido com sucesso!')
        }).catch(err => {
            this.alert('Ocorreu um erro. Por favor, tente novamente.', true)

        });;

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
                                        <td data-label="Index:">{index + 1}</td>
                                        <td data-label="Nome:">{user.name} </td>
                                        <td data-label="Email:">{user.email}</td>
                                        <td data-label="Telefone:">{user.phone_number}</td>
                                        <td data-label="Ações:" className="table-buttons">
                                            <div className="table-buttons-group">

                                                <i className="fas fa-edit" onClick={() => this.setState({ showForm: true, User: user })}></i>
                                                {index !== 0 && (
                                                    <i className="fas fa-trash" onClick={() => this.onDelete(user.id)}></i>
                                                )}
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
                        <h2 className="form-user-title">Insira os dados do novo usuário</h2>

                        <div className="grupo-inputs">
                            <label className="label">Nome:</label>
                            <input
                                type="text"
                                name="name"
                                pattern="^[A-Za-zÀ-ú\s]+$"
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
                            <InputMask
                                mask="(99) 99999-9999"
                                maskChar=""
                                type="tel"
                                name="phone_number"
                                placeholder="(99) 99999-9999"
                                value={this.state.User ? this.state.User.phone_number : ''}
                                onChange={e => this.setState({
                                    User: {
                                        ...this.state.User,
                                        phone_number: e.target.value.replace(/\D/g, "")
                                    }
                                })}
                                required
                                                        />
                        </div>

                        <div className="grupo-inputs">
                            <label className="label">Data de nascimento:</label>
                            <input
                                type="date"
                                name="age"
                                required
                                max={this.maxDate}
                                value={this.state.age}
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
                                    title="Senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
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

                        <div className="grupo-inputs button admin">
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