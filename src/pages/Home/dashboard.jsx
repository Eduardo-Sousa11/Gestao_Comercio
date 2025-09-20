import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';
import { FaBuilding, FaBoxOpen, FaUsers, FaShoppingCart, FaSignOutAlt, FaHome, FaInfoCircle } from 'react-icons/fa';

function Dashboard() {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('Home');
    const [userName, setUserName] = useState('Eduardo Sousa');

    const handleLogout = () => {
        alert("Você saiu da conta!");
        navigate('/login');
    };

    const renderContent = () => {

        switch (activeMenu) {
            case 'Home':
                return (
                    <div className="home-content">
                        <h2>Bem-vindo ao Sistema</h2>
                        <p>Este sistema permite gerenciar empresas, produtos, clientes e pedidos de forma prática e organizada. Utilize o menu lateral para navegar entre as funcionalidades.</p>
                        <p>Você terá acesso rápido às informações importantes e relatórios de desempenho, além de poder configurar sua conta facilmente.</p>
                    </div>
                );
            case 'Empresas':
                return <p>Gerencie suas empresas aqui.</p>;
            case 'Produtos':
                return <p>Veja e gerencie produtos.</p>;
            case 'Clientes':
                return <p>Lista de clientes e informações.</p>;
            case 'Pedidos':
                return <p>Controle de pedidos e status.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li className={activeMenu === 'Home' ? 'active' : ''} onClick={() => setActiveMenu('Home')}>
                        <FaHome /> Home
                    </li>
                    <li className={activeMenu === 'Empresas' ? 'active' : ''} onClick={() => setActiveMenu('Empresas')}>
                        <FaBuilding /> Empresas
                    </li>
                    <li className={activeMenu === 'Produtos' ? 'active' : ''} onClick={() => setActiveMenu('Produtos')}>
                        <FaBoxOpen /> Produtos
                    </li>
                    <li className={activeMenu === 'Clientes' ? 'active' : ''} onClick={() => setActiveMenu('Clientes')}>
                        <FaUsers /> Clientes
                    </li>
                    <li className={activeMenu === 'Pedidos' ? 'active' : ''} onClick={() => setActiveMenu('Pedidos')}>
                        <FaShoppingCart /> Pedidos
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

export default Dashboard;
