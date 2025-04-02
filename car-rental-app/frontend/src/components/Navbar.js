import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Car Rental App</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/vehicles">Veículos</Link></li>
                <li><Link to="/clients">Clientes</Link></li>
                <li><Link to="/rentals">Locações</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;