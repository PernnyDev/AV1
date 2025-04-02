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
                clientId: selectedRental.clientId || '',
                vehicleId: selectedRental.vehicleId || '',
                startDate: selectedRental.startDate ? selectedRental.startDate.split('T')[0] : '',
                endDate: selectedRental.endDate ? selectedRental.endDate.split('T')[0] : '',
                totalPrice: selectedRental.totalPrice || '',
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
            resetForm();
            refreshRentals();
        } catch (error) {
            console.error('Erro ao salvar locação:', error);
            alert('Erro ao salvar locação.');
        }
    };

    const resetForm = () => {
        setFormData({
            clientId: '',
            vehicleId: '',
            startDate: '',
            endDate: '',
            totalPrice: '',
        });
        setSelectedRental(null);
    };

    return (
        <>
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <button type="submit">
                        {selectedRental ? 'Atualizar Locação' : 'Cadastrar Locação'}
                    </button>
                    <button type="button" onClick={resetForm}>
                        Nova Locação
                    </button>
                </div>
            </form>
        </>
    );
};

export default RentalForm;