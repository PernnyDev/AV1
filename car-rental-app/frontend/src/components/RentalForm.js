import React, { useState, useEffect } from 'react';
import { fetchClientsData, fetchVehiclesData, createRental, updateRental } from '../services/api';
import './RentalForm.css';

const RentalForm = ({ selectedRental, setSelectedRental, refreshRentals }) => {
    const [formData, setFormData] = useState({
        clientId: '',
        vehicleId: '',
        startDate: '',
        endDate: '',
        totalPrice: '',
    });
    const [clients, setClients] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const clientsData = await fetchClientsData();
                const vehiclesData = await fetchVehiclesData();
                setClients(clientsData);
                setVehicles(vehiclesData);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (selectedRental) {
            setFormData({
                ...selectedRental,
                startDate: selectedRental.startDate.split('T')[0], // Ajusta o formato da data
                endDate: selectedRental.endDate.split('T')[0],   // Ajusta o formato da data
            });
        }
    }, [selectedRental]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedRental) {
                await updateRental(selectedRental.id, formData);
                alert('Locação atualizada com sucesso!');
            } else {
                await createRental(formData);
                alert('Locação criada com sucesso!');
            }
            setFormData({
                clientId: '',
                vehicleId: '',
                startDate: '',
                endDate: '',
                totalPrice: '',
            });
            setSelectedRental(null);
            refreshRentals();
        } catch (error) {
            console.error('Erro ao salvar locação:', error);
            alert('Erro ao salvar locação.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Cliente:</label>
            <select name="clientId" value={formData.clientId} onChange={handleChange}>
                <option value="">Selecione um cliente</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>

            <label>Veículo:</label>
            <select name="vehicleId" value={formData.vehicleId} onChange={handleChange}>
                <option value="">Selecione um veículo</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} - {vehicle.model}
                    </option>
                ))}
            </select>

            <label>Data de Início:</label>
            <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
            />

            <label>Data de Término:</label>
            <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
            />

            <label>Preço Total:</label>
            <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                placeholder="Digite o preço total"
            />

            <button type="submit">Salvar Locação</button>
        </form>
    );
};

export default RentalForm;