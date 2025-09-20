import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function OrderEdit({ order, clientes = [], empresas = [], onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        numero: "",
        cliente: "",
        empresa: "",
        observacao: "",
        data: ""
    })

    useEffect(() => {
        if (order) {
            const empresaSelecionada = empresas.find(e => e.name === order.empresa);
            const clienteSelecionado = clientes.find(c => c.name === order.cliente);
            setFormData({
                name: order.name,
                numero: order.numero,
                cliente: clienteSelecionado ? clienteSelecionado.id : "",
                empresa: empresaSelecionada ? empresaSelecionada.id : "",
                observacao: order.observacao,
                data: order.data
            })
        }
    }, [order, empresas, clientes])


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (e) => {
        const [year, month, day] = e.target.value.split("-")
        setFormData({ ...formData, data: `${day}/${month}/${year}` })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const empresaSelecionada = empresas.find(emp => emp.id === parseInt(formData.empresa));
        const clienteSelecionado = clientes.find(cli => cli.id === parseInt(formData.cliente));
        onSave({
            ...formData,
            id: order.id,
            empresa: empresaSelecionada ? empresaSelecionada.name : "",
            cnpj: empresaSelecionada ? empresaSelecionada.cnpj : "",
            cliente: clienteSelecionado ? clienteSelecionado.name : ""
        })
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Editar Pedido</h3>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Numero</label>
                        <input
                            type="number"
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cliente</label>
                        <select
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes.map((cli) => (
                                <option key={cli.id} value={cli.id}>
                                    {cli.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Empresa</label>
                        <select
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione uma empresa</option>
                            {empresas.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Observação</label>
                        <input
                            type="text"
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={
                                formData.data
                                    ? `${formData.data.split("/")[2]}-${formData.data.split("/")[1]}-${formData.data.split("/")[0]}`
                                    : ""
                            }
                            onChange={handleDateChange}
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

export default OrderEdit
