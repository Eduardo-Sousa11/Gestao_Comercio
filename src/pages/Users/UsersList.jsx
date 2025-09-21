import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import UsersForm from './UserForm'
import UsersEdit from './UserEdit'

function UsersList() {
    const [users, setUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUsers, setEditingUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            setUsers([
                { id: 1, name: 'Eduardo de Sousa', email: 'asdf@asdf.com', senha: '123456' },
                { id: 1, name: 'Eduardo de Sousa', email: 'asdf@asdf.com', senha: '123456' },
            ])
        }
        fetchUsers()
    }, [])

    const handleEdit = (users) => {
        setEditingUsers(users)
    }

    const handleUpdateUsers = (updatedUsers) => {
        setUsers(users.map(u => u.id === updatedUsers.id ? updatedUsers : u))
        setEditingUsers(null)
    }

    const handleDelete = (usersId) => {
        if (window.confirm('Deseja realmente excluir este usuário?')) {
            setUsers(users.filter(u => u.id !== usersId))
            alert('Usuário excluído com sucesso!');
        }
    };

    const handleAddUsers = () => {
        setIsModalOpen(true);
    };

    const handleSaveUsers = (newUsers) => {
        setUsers([...users, { ...newUsers, id: users.length + 1 }])
        setIsModalOpen(false)
    };

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Usuários</h2>
                <button className="add-company-button" onClick={handleAddUsers}>
                    <FaPlus /> Cadastrar Usuários
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(user)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(user.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <UsersForm
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveUsers}
                />
            )}

            {/* Modal de Edição */}
            {editingUsers && (
                <UsersEdit
                    users={editingUsers}
                    onClose={() => setEditingUsers(null)}
                    onSave={handleUpdateUsers}
                />
            )}

        </div>
    );
}

export default UsersList
