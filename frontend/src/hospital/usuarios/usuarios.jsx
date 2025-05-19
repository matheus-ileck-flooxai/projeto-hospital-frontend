import React, { Component, use } from "react";
import Axios from "axios";
import './usuarios.css'

class usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    componentDidMount() {
        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/users`)
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

            </div>
        );
    }
}

export default usuarios