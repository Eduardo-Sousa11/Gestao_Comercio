import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import OrderLaunchForm from './OrderLaunchForm'
import OrderLaunchEdit from './OrderLaunchEdit'

function OrdersLaunchList() {
    const [orderslaunch, setOrdersLaunch] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingOrderLaunch, setEditingOrderLaunch] = useState(null)

    const [products] = useState([
        { id: 1, name: 'Arroz', valor: '15,00', descricao: 'arroz de qualidade', empresa: 'Empresa A' },
        { id: 2, name: 'Feijão', valor: '10,00', descricao: 'feijão de qualidade', empresa: 'Empresa B' },
    ])

    const [orders] = useState([
        { id: 1, name: 'pedido supermercado', numero: '1', cliente: 'Eduardo de Sousa', empresa: 'Empresa A', observacao: 'Observação 1', data: '20/10/2025' },
        { id: 2, name: 'pedido supermercado', numero: '2', cliente: 'Eduardo de Sousa', empresa: 'Empresa B', observacao: 'Observação 2', data: '10/10/2025' },
    ])

    useEffect(() => {
        const fetchOrdersLaunch = async () => {
            setOrdersLaunch([
                { id: 1, pedido: 1, produto: 2, quantidade: '2' },
                { id: 2, pedido: 2, produto: 1, quantidade: '3' },
            ])
        }
        fetchOrdersLaunch()
    }, [])

    const handleEdit = (orderlaunch) => {
        setEditingOrderLaunch(orderlaunch)
    }

    const handleUpdateOrderLaunch = (updatedOrderLaunch) => {
        setOrdersLaunch(orderslaunch.map(ol => ol.id === updatedOrderLaunch.id ? updatedOrderLaunch : ol))
        setEditingOrderLaunch(null)
    }

    const handleDelete = (orderLaunchId) => {
        if (window.confirm('Deseja realmente excluir este lançamento de pedido?')) {
            setOrdersLaunch(orderslaunch.filter(ol => ol.id !== orderLaunchId))
            alert('Pedido excluído com sucesso!')
        }
    }

    const handleAddOrderLaunch = () => {
        setIsModalOpen(true)
    }

    const handleSaveOrderLaunch = (newOrderLaunch) => {
        setOrdersLaunch([...orderslaunch, { ...newOrderLaunch, id: orderslaunch.length + 1 }])
        setIsModalOpen(false)
    }

    const getProdutoName = (id) => products.find(p => p.id === id)?.name || ''
    const getPedidoName = (id) => orders.find(p => p.id === id)?.name || ''

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Lançamentos Pedidos</h2>
                <button className="add-company-button" onClick={handleAddOrderLaunch}>
                    <FaPlus /> Lançar pedidos
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pedido</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orderslaunch.map(orderlaunch => (
                        <tr key={orderlaunch.id}>
                            <td>{orderlaunch.id}</td>
                            <td>{orderlaunch.pedido}</td>
                            <td>{orderlaunch.produto}</td>
                            <td>{orderlaunch.quantidade}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(orderlaunch)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(orderlaunch.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <OrderLaunchForm
                    produtos={products}
                    pedidos={orders}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveOrderLaunch}
                />
            )}

            {/* Modal de Edição */}
            {editingOrderLaunch && (
                <OrderLaunchEdit
                    orderLaunch={editingOrderLaunch}
                    produtos={products}
                    pedidos={orders}
                    onClose={() => setEditingOrderLaunch(null)}
                    onSave={handleUpdateOrderLaunch}
                />
            )}
        </div>
    )
}

export default OrdersLaunchList
