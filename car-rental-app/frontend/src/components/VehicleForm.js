import React, { useState, useEffect } from 'react';
import './VehicleForm.css';
import { createVehicle, updateVehicle } from '../services/api';

const VehicleForm = ({ selectedVehicle, setSelectedVehicle, refreshVehicles }) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        plate: '',
        available: true,
        price: ''
    });

    useEffect(() => {
        if (selectedVehicle) {
            setFormData(selectedVehicle);
        }
    }, [selectedVehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Dados enviados para atualização:', formData);
            if (selectedVehicle) {
                // Atualizar veículo existente
                await updateVehicle(selectedVehicle.id, formData);
                alert('Veículo atualizado com sucesso!');
            } else {
                // Criar novo veículo
                await createVehicle(formData);
                alert('Veículo criado com sucesso!');
            }
            setFormData({
                brand: '',
                model: '',
                year: '',
                plate: '',
                available: true,
                price: ''
            });
            setSelectedVehicle(null);
            refreshVehicles(); // Atualiza a lista de veículos
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
            alert('Erro ao salvar veículo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Marca:</label>
            <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Digite a marca"
            />
            <label>Modelo:</label>
            <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Digite o modelo"
            />
            <label>Ano:</label>
            <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Digite o ano"
            />
            <label>Placa:</label>
            <input
                type="text"
                name="plate"
                value={formData.plate}
                onChange={handleChange}
                placeholder="Digite a placa"
            />
            <label>Disponível:</label>
            <select
                name="available"
                value={formData.available}
                onChange={handleChange}
            >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
            </select>
            <label>Preço:</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Digite o preço"
            />
            <button type="submit">Salvar Veículo</button>
        </form>
    );
};

export default VehicleForm;