import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStats } from '../services/api';
import './HomePage.css';

const HomePage = () => {
    const [stats, setStats] = useState({
        totalVehiclesAvailable: 0,
        totalClients: 0,
        totalActiveRentals: 0,
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
                <h1>Bem-vindo ao Car Rental App</h1>
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
                        <p>{stats.totalVehiclesAvailable}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Clientes Cadastrados</h3>
                        <p>{stats.totalClients}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Locações Ativas</h3>
                        <p>{stats.totalActiveRentals}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;