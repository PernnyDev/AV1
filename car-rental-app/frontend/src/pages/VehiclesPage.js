import React, { useEffect, useState } from 'react';
import VehicleList from '../components/VehicleList';
import VehicleForm from '../components/VehicleForm';
import { fetchVehiclesData, deleteVehicle } from '../services/api';

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const refreshVehicles = async () => {
        try {
            const data = await fetchVehiclesData();
            console.log('Veículos retornados:', data); // Log dos veículos retornados
            setVehicles(data);
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    useEffect(() => {
        refreshVehicles(); // Busca os veículos ao carregar a página
    }, []);

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const handleDelete = async (id) => {
        try {
            await deleteVehicle(id); // Chama a API para excluir o veículo
            alert('Veículo excluído com sucesso!');
            refreshVehicles(); // Atualiza a lista de veículos
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
            alert('Erro ao excluir veículo.');
        }
    };

    return (
        <div>
            <h1>Gerenciamento de Veículos</h1>
            <VehicleForm
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                refreshVehicles={refreshVehicles}
            />
            <VehicleList vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default VehiclesPage;