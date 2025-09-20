import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function OrderLaunchEdit({ orderLaunch, produtos = [], pedidos = [], onClose, onSave }) {
    const [formData, setFormData] = useState({
        produto: "",
        pedido: "",
        quantidade: ""
    })

    useEffect(() => {
        if (orderLaunch) {
            const produtoSelecionada = produtos.find(p => p.name === orderLaunch.produto);
            const pedidoSelecionado = pedidos.find(p => p.name === orderLaunch.pedido);
            setFormData({
                quantidade: orderLaunch.quantidade,
                produto: produtoSelecionada ? produtoSelecionada.id : "",
                pedido: pedidoSelecionado ? pedidoSelecionado.id : "",
            })
        }
    }, [orderLaunch, produtos, pedidos])


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const produtoSelecionada = produtos.find(pro => pro.id === parseInt(formData.produto));
        const pedidoSelecionado = pedidos.find(ped => ped.id === parseInt(formData.pedido));
        onSave({
            ...formData,
            id: orderLaunch.id,
            produto: produtoSelecionada ? produtoSelecionada.name : "",
            pedido: pedidoSelecionado ? pedidoSelecionado.name : ""
        })
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Editar Pedido Lançado</h3>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Produto</label>
                        <select
                            name="produto"
                            value={formData.produto}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um produto</option>
                            {produtos.map((pro) => (
                                <option key={pro.id} value={pro.id}>
                                    {pro.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Pedido</label>
                        <select
                            name="pedido"
                            value={formData.pedido}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um pedido</option>
                            {pedidos.map((ped) => (
                                <option key={ped.id} value={ped.id}>
                                    {ped.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Quantidade</label>
                        <input
                            type="text"
                            name="quantidade"
                            value={formData.quantidade}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OrderLaunchEdit
