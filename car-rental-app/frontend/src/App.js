import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import ClientsPage from './pages/ClientsPage';
import RentalsPage from './pages/RentalsPage';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/rentals" element={<RentalsPage />} />
            </Routes>
        </Router>
    );
};

export default App;