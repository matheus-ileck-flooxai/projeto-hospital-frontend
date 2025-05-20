import React, { Component, use } from "react";
import Axios from "axios";
import './usuarios.css'
import showForm from "../../utils/utils";

class usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],

            newUser: {}
        };
    }
    componentDidMount() {
        const token = localStorage.getItem('token')

        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/Hospital/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => {
                this.setState({ users: resp.data })
            })
            .catch(err => {
                console.log(err.message);

            })
    }

   



    render() {
        let users = this.state.users
        return (
            <div className="content">
                <button className="new-user-button" onClick={showForm}>Novo usuario</button>
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
                            <tr key={user._id}>
                                <td>{index}</td>
                                <td>{user.name} </td>
                                <td>{user.email}</td>
                                <td className="table-buttons">
                                    <button>Editar</button>
                                    <button>Excluir</button>
                                </td>

                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <form className="form" onSubmit={this.onSubmit}>
                    <h2>Insira os dados do novo usuário</h2>


                    <div className="form-row">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" name="name"/>
                        </div>

                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="tel"  name="phone"/>
                        </div>
                        <div className="form-group">
                            <label>Data de nascimento</label>
                            <input type="date" name="age" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" name="password"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <button>Cancelar</button>
                        <button type="submit">Enviar</button>
                    </div>

                </form>



            </div>
        );
    }
}

export default usuarios