import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStats } from '../services/api';
import './HomePage.css';

const HomePage = () => {
    const [stats, setStats] = useState({
        vehiclesAvailable: 0,
        clientsRegistered: 0,
        activeRentals: 0,
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchStats();
                setStats(data);
            } catch (error) {
                console.error('Erro ao carregar estatísticas:', error);
            }
        };

        loadStats();
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Dashboard</h1>
                <p>Gerencie seus veículos, clientes e locações de forma eficiente.</p>
            </header>
            <section className="home-links">
                <Link to="/vehicles" className="home-link">Gerenciar Veículos</Link>
                <Link to="/clients" className="home-link">Gerenciar Clientes</Link>
                <Link to="/rentals" className="home-link">Gerenciar Locações</Link>
            </section>
            <section className="home-stats">
                <h2>Estatísticas</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Veículos Disponíveis</h3>
                        <p>{stats.vehiclesAvailable}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Clientes Cadastrados</h3>
                        <p>{stats.clientsRegistered}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Locações Ativas</h3>
                        <p>{stats.activeRentals}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;