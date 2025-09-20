import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import ClientForm from './ClientForm'
import ClientEdit from './ClientEdit'
import CompaniesList from "../Companies/CompaniesList"

function ClientList() {
    const [clients, setClients] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingClient, setEditingClient] = useState(null)
    const [companies] = useState([
        { id: 1, name: 'Empresa A', razaoSocial: 'razaoSocial A', cnpj: '00.000.000/0001-01' },
        { id: 2, name: 'Empresa B', razaoSocial: 'razaoSocial B', cnpj: '11.111.111/0001-11' },
    ])

    useEffect(() => {
        const fetchClients = async () => {
            setClients([
                { id: 1, name: 'Eduardo de Sousa ', email: 'asdf@asdf.com', telefone: '(11) 1111-1111', empresa: 'Empresa A', cnpj: '00.000.000/0001-01' },
                { id: 2, name: 'Eduardo de Sousa ', email: 'asdf@asdf.com', telefone: '(11) 1111-1111', empresa: 'Empresa A', cnpj: '00.000.000/0001-01' },
            ])
        }
        fetchClients()
    }, [])

    const handleEdit = (client) => {
        setEditingClient(client)
    }

    const handleUpdateClient = (updatedClient) => {
        setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c))
        setEditingClient(null)
    }

    const handleDelete = (clientId) => {
        if (window.confirm('Deseja realmente excluir este cliente?')) {
            setClients(clients.filter(c => c.id !== clientId))
            alert('Cliente excluída com sucesso!');
        }
    };

    const handleAddClient = () => {
        setIsModalOpen(true)
    };

    const handleSaveClient = (newClients) => {
        setClients([...clients, { ...newClients, id: clients.length + 1 }])
        setIsModalOpen(false)
    };

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Clientes</h2>
                <button className="add-company-button" onClick={handleAddClient}>
                    <FaPlus /> Cadastrar Clientes
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.telefone}</td>
                            <td>{client.empresa}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(client)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(client.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <ClientForm
                    empresas={companies}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveClient}
                />
            )}

            {/* Modal de Edição */}
            {editingClient && (
                <ClientEdit
                    client={editingClient}
                    empresas={companies}
                    onClose={() => setEditingClient(null)}
                    onSave={handleUpdateClient}
                />
            )}

        </div>
    );
}

export default ClientList;
