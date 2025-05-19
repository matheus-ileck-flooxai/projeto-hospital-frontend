import React, { Component, use } from "react";
import Axios from "axios";

class usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteers: []
        };
        
    }
    componentDidMount() {
        Axios.get(`https://projeto-hospital-backend-production.up.railway.app/api/users`)
            .then(resp => {
                this.setState({ volunteers: resp.data })
            })
            .catch(err => {
                console.log(err.message);

            })
    }



    render() {
        let volunteers = this.state.volunteers
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
                        {volunteers.map((volunteers, index) =>
                            <tr key={volunteers._id}>
                                <td>{index}</td>
                                <td>{volunteers.name} </td>
                                <td>{volunteers.email}</td>
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