import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import OrdersForm from './OrderForm'
import OrdersEdit from './OrderEdit'

function OrderList() {
    const [orders, setOrders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingOrder, setEditingOrder] = useState(null)
    const [companies] = useState([
        { id: 1, name: 'Empresa A', razaoSocial: 'razaoSocial A', cnpj: '00.000.000/0001-01' },
        { id: 2, name: 'Empresa B', razaoSocial: 'razaoSocial B', cnpj: '11.111.111/0001-11' },
    ])
    const [clients] = useState([
        { id: 1, name: 'Eduardo de Sousa ', email: 'asdf@asdf.com', telefone: '(11) 1111-1111' },
        { id: 2, name: 'Eduardo de Sousa ', email: 'asdf@asdf.com', telefone: '(11) 1111-1111' },
    ])

    useEffect(() => {
        const fetchOrders = async () => {
            setOrders([
                { id: 1, name: 'pedido supermercado', numero: '1 ', cliente: 'Eduardo de Sousa', empresa: 'Empresa A', observacao: 'Observação 1', data: '20/10/2025' },
                { id: 2, name: 'pedido supermercado', numero: '2 ', cliente: 'Eduardo de Sousa', empresa: 'Empresa B', observacao: 'Observação 2', data: '10/10/2025' },
            ])
        }
        fetchOrders()
    }, [])

    const handleEdit = (order) => {
        setEditingOrder(order)
    }

    const handleUpdateOrder = (updatedOrder) => {
        setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o))
        setEditingOrder(null)
    }

    const handleDelete = (orderId) => {
        if (window.confirm('Deseja realmente excluir este pedido ?')) {
            setOrders(orders.filter(o => o.id !== orderId))
            alert('Pedido excluído com sucesso!');
        }
    };

    const handleAddOrder = () => {
        setIsModalOpen(true)
    };

    const handleSaveOrder = (newOrders) => {
        setOrders([...orders, { ...newOrders, id: orders.length + 1 }])
        setIsModalOpen(false)
    };

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Pedidos</h2>
                <button className="add-company-button" onClick={handleAddOrder}>
                    <FaPlus /> Cadastrar Pedidos
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Numero do Pedido</th>
                        <th>Cliente</th>
                        <th>Empresa</th>
                        <th>Observação</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.numero}</td>
                            <td>{order.cliente}</td>
                            <td>{order.empresa}</td>
                            <td>{order.observacao}</td>
                            <td>{order.data}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(order)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(order.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <OrdersForm
                    empresas={companies}
                    clientes={clients}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveOrder}
                />
            )}

            {/* Modal de Edição */}
            {editingOrder && (
                <OrdersEdit
                    order={editingOrder}
                    empresas={companies}
                    clientes={clients}
                    onClose={() => setEditingOrder(null)}
                    onSave={handleUpdateOrder}
                />
            )}

        </div>
    );
}

export default OrderList
