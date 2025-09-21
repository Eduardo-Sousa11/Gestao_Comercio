import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles.css'
import { FaBuilding, FaBoxOpen, FaUsers, FaShoppingCart, FaSignOutAlt, FaHome, FaPlusCircle } from 'react-icons/fa'
import Companies from '../Companies/CompaniesList'
import Clients from '../Clients/ClientsList'
import Products from '../Products/ProductsList'
import Orders from '../Orders/OrdersList'
import OrderLaunch from '../OrderLaunch/OrderLaunchList'
import Users from '../Users/UsersList'


function Dashboard() {
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState('Gestão de Comércio')
    const [userName, setUserName] = useState('Eduardo Sousa')

    const handleLogout = () => {
        alert("Você saiu da conta!")
        navigate('/login')
    };

    const renderContent = () => {

        switch (activeMenu) {
            case 'Gestão de Comércio':
                return (
                    <div className="home-content">
                        <h2>Bem-vindo ao Sistema</h2>
                        <p>Este sistema permite gerenciar empresas, produtos, clientes e pedidos de forma prática e organizada. Utilize o menu lateral para navegar entre as funcionalidades.</p>
                        <p>Você terá acesso rápido às informações importantes e relatórios de desempenho, além de poder configurar sua conta facilmente.</p>
                    </div>
                );
            case 'Empresas':
                return <Companies />
            case 'Clientes':
                return <Clients />
            case 'Produtos':
                return <Products />
            case 'Pedidos':
                return <Orders />
            case 'Lançamentos Pedidos':
                return <OrderLaunch />
            case 'Usuários':
                return <Users />
            default:
                return null
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2 className="dashboard-title" onClick={() => setActiveMenu('Gestão de Comércio')} style={{ cursor: 'pointer' }} >
                    Dashboard
                </h2>
                <ul>
                    <li className={activeMenu === 'Empresas' ? 'active' : ''} onClick={() => setActiveMenu('Empresas')}>
                        <FaBuilding /> Empresas
                    </li>
                    <li className={activeMenu === 'Clientes' ? 'active' : ''} onClick={() => setActiveMenu('Clientes')}>
                        <FaUsers /> Clientes
                    </li>
                    <li className={activeMenu === 'Produtos' ? 'active' : ''} onClick={() => setActiveMenu('Produtos')}>
                        <FaBoxOpen /> Produtos
                    </li>
                    <li className={activeMenu === 'Pedidos' ? 'active' : ''} onClick={() => setActiveMenu('Pedidos')}>
                        <FaShoppingCart /> Pedidos
                    </li>
                    <li
                        className={activeMenu === 'Lançamentos Pedidos' ? 'active' : ''}
                        onClick={() => setActiveMenu('Lançamentos Pedidos')}
                    >
                        <FaPlusCircle /> Lançar Pedidos
                    </li>
                    <li className={activeMenu === 'Usuários' ? 'active' : ''} onClick={() => setActiveMenu('Usuários')}>
                        <FaUsers  /> Usuários
                    </li>

                    <li className="logout" onClick={handleLogout}>
                        <FaSignOutAlt /> Sair
                    </li>
                </ul>
            </aside>

            <main className="dashboard-main">
                <div className="dashboard-header">
                    <h1>{activeMenu}</h1>
                    <div className="user-card">
                        <FaUsers className="user-icon" />
                        <span>{userName}</span>
                    </div>
                </div>
                {renderContent()}
            </main>

        </div>
    );
}

export default Dashboard
