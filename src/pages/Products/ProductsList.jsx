import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import ProductForm from './ProductForm'
import ProductEdit from './ProductEdit'

function ProductList() {
    const [products, setProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [companies] = useState([
        { id: 1, name: 'Empresa A', razaoSocial: 'razaoSocial A', cnpj: '00.000.000/0001-01' },
        { id: 2, name: 'Empresa B', razaoSocial: 'razaoSocial B', cnpj: '11.111.111/0001-11' },
    ])

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts([
                { id: 1, name: 'Arroz ', valor: '15,00', descricao: 'arroz de qualidade', empresa: 'Empresa A' },
                { id: 2, name: 'Feijão ', valor: '10,00', descricao: 'feijão de qualidade', empresa: 'Empresa B'},
            ])
        }
        fetchProducts()
    }, [])

    const handleEdit = (product) => {
        setEditingProduct(product)
    }

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
        setEditingProduct(null)
    }

    const handleDelete = (productId) => {
        if (window.confirm('Deseja realmente excluir este produto?')) {
            setProducts(products.filter(c => c.id !== productId))
            alert('Produto excluída com sucesso!');
        }
    };

    const handleAddProduct = () => {
        setIsModalOpen(true)
    };

    const handleSaveProduct = (newProducts) => {
        setProducts([...products, { ...newProducts, id: products.length + 1 }])
        setIsModalOpen(false)
    };

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Produtos</h2>
                <button className="add-company-button" onClick={handleAddProduct}>
                    <FaPlus /> Cadastrar Produtos
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.valor}</td>
                            <td>{product.descricao}</td>
                            <td>{product.empresa}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(product)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(product.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <ProductForm
                    empresas={companies}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProduct}
                />
            )}

            {/* Modal de Edição */}
            {editingProduct && (
                <ProductEdit
                    product={editingProduct}
                    empresas={companies}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleUpdateProduct}
                />
            )}

        </div>
    );
}

export default ProductList
