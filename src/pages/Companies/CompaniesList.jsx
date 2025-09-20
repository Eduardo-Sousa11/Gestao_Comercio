import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import CompaniesForm from './CompanieForm'
import CompaniesEdit from './CompanieEdit'

function CompaniesList() {
    const [companies, setCompanies] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCompany, setEditingCompany] = useState(null)

    useEffect(() => {
        const fetchCompanies = async () => {
            setCompanies([
                { id: 1, name: 'Empresa A', razaoSocial: 'razaoSocial A', cnpj: '00.000.000/0001-01' },
                { id: 2, name: 'Empresa B', razaoSocial: 'razaoSocial B', cnpj: '11.111.111/0001-11' },
            ])
        }
        fetchCompanies()
    }, [])

    const handleEdit = (company) => {
        setEditingCompany(company)
    }

    const handleUpdateCompany = (updatedCompany) => {
        setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c))
        setEditingCompany(null)
    }

    const handleDelete = (companyId) => {
        if (window.confirm('Deseja realmente excluir esta empresa?')) {
            setCompanies(companies.filter(c => c.id !== companyId))
            alert('Empresa excluída com sucesso!');
        }
    };

    const handleAddCompany = () => {
        setIsModalOpen(true);
    };

    const handleSaveCompany = (newCompany) => {
        setCompanies([...companies, { ...newCompany, id: companies.length + 1 }])
        setIsModalOpen(false)
    };

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Empresas</h2>
                <button className="add-company-button" onClick={handleAddCompany}>
                    <FaPlus /> Cadastrar Empresa
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Fantasia</th>
                        <th>Razão Social</th>
                        <th>CNPJ</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.razaoSocial}</td>
                            <td>{company.cnpj}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(company)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(company.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <CompaniesForm
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveCompany}
                />
            )}

            {/* Modal de Edição */}
            {editingCompany && (
                <CompaniesEdit
                    company={editingCompany}
                    onClose={() => setEditingCompany(null)}
                    onSave={handleUpdateCompany}
                />
            )}

        </div>
    );
}

export default CompaniesList
