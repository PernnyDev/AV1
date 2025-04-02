import React, { useEffect, useState } from 'react';
import { fetchVehiclesData, createVehicle, updateVehicle, deleteVehicle } from '../services/api';
import './VehiclesPage.css';

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        price: '',
        available: '',
    });
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        plate: '',
        available: true,
        price: '',
    });
    const [editingVehicleId, setEditingVehicleId] = useState(null);

    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const data = await fetchVehiclesData();
                console.log('Veículos carregados:', data); // Adicione este log para depuração
                setVehicles(data);
                setFilteredVehicles(data); // Certifique-se de que os dados também estão sendo filtrados
            } catch (error) {
                console.error('Erro ao carregar veículos:', error);
            }
        };

        loadVehicles();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });

        const filtered = vehicles.filter((vehicle) => {
            return (
                (filters.brand === '' || vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
                (filters.model === '' || vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) &&
                (filters.price === '' || vehicle.price <= parseFloat(filters.price)) &&
                (filters.available === '' || vehicle.available.toString() === filters.available)
            );
        });

        setFilteredVehicles(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVehicleId) {
                await updateVehicle(editingVehicleId, formData);
                alert('Veículo atualizado com sucesso!');
                setEditingVehicleId(null);
            } else {
                await createVehicle(formData);
                alert('Veículo cadastrado com sucesso!');
            }

            resetForm();
            const data = await fetchVehiclesData();
            setVehicles(data);
            setFilteredVehicles(data);
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
            alert('Erro ao salvar veículo.');
        }
    };

    const handleEdit = (vehicle) => {
        setEditingVehicleId(vehicle.id);
        setFormData({
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            plate: vehicle.plate,
            available: vehicle.available,
            price: vehicle.price,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
            try {
                await deleteVehicle(id);
                alert('Veículo excluído com sucesso!');
                const data = await fetchVehiclesData();
                setVehicles(data);
                setFilteredVehicles(data);
            } catch (error) {
                console.error('Erro ao excluir veículo:', error);
                alert('Erro ao excluir veículo.');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            brand: '',
            model: '',
            year: '',
            plate: '',
            available: true,
            price: '',
        });
        setEditingVehicleId(null);
    };

    return (
        <div>
            <h1>Gerenciamento de Veículos</h1>

            {/* Formulário de Cadastro */}
            <form className="vehicle-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="brand"
                    placeholder="Marca"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Modelo"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Ano"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="plate"
                    placeholder="Placa"
                    value={formData.plate}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="available"
                    value={formData.available}
                    onChange={handleInputChange}
                >
                    <option value={true}>Disponível</option>
                    <option value={false}>Indisponível</option>
                </select>
                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {editingVehicleId ? 'Atualizar Veículo' : 'Cadastrar Veículo'}
                </button>
                <button type="button" onClick={resetForm}>
                    Resetar Formulário
                </button>
            </form>

            {/* Filtros */}
            <div className="filters">
                <input
                    type="text"
                    name="brand"
                    placeholder="Filtrar por marca"
                    value={filters.brand}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Filtrar por modelo"
                    value={filters.model}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Filtrar por preço máximo"
                    value={filters.price}
                    onChange={handleFilterChange}
                />
                <select
                    name="available"
                    value={filters.available}
                    onChange={handleFilterChange}
                >
                    <option value="">Disponibilidade</option>
                    <option value="true">Disponível</option>
                    <option value="false">Indisponível</option>
                </select>
            </div>

            {/* Tabela de Veículos */}
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Placa</th>
                        <th>Disponível</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.brand}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.plate}</td>
                            <td>{vehicle.available ? 'Sim' : 'Não'}</td>
                            <td>{vehicle.price}</td>
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => handleEdit(vehicle)}>Editar</button>
                                    <button onClick={() => handleDelete(vehicle.id)}>Excluir</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehiclesPage;