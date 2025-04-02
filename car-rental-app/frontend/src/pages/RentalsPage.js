import React, { useEffect, useState } from 'react';
import { fetchRentalsData, deleteRental, createRental, updateRental } from '../services/api';
import RentalForm from '../components/RentalForm';

const RentalsPage = () => {
    const [rentals, setRentals] = useState([]);
    const [selectedRental, setSelectedRental] = useState(null);
    const [formData, setFormData] = useState({});
    const [editingRentalId, setEditingRentalId] = useState(null);

    const refreshRentals = async () => {
        try {
            const data = await fetchRentalsData();
            console.log('Locações carregadas:', data);
            setRentals(data);
        } catch (error) {
            console.error('Erro ao carregar locações:', error);
        }
    };

    useEffect(() => {
        refreshRentals();
    }, []);

    const handleEdit = (rental) => {
        setSelectedRental(rental);
        setEditingRentalId(rental.id);
        setFormData({
            clientId: rental.clientId,
            vehicleId: rental.vehicleId,
            startDate: rental.startDate,
            endDate: rental.endDate,
            totalPrice: rental.totalPrice,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta locação?')) {
            try {
                await deleteRental(id);
                alert('Locação excluída com sucesso!');
                const data = await fetchRentalsData();
                setRentals(data);
            } catch (error) {
                console.error('Erro ao excluir locação:', error);
                alert('Erro ao excluir locação.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRentalId) {
                await updateRental(editingRentalId, formData);
                alert('Locação atualizada com sucesso!');
            } else {
                await createRental(formData);
                alert('Locação criada com sucesso!');
            }

            resetForm();
            const data = await fetchRentalsData();
            setRentals(data);
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
        setEditingRentalId(null);
        setSelectedRental(null);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('pt-BR', options);
    };

    return (
        <div>
            <h1>Gerenciamento de Locações</h1>
            <RentalForm
                selectedRental={selectedRental}
                setSelectedRental={setSelectedRental}
                refreshRentals={refreshRentals}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Data de Início</th>
                        <th>Data de Término</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental) => (
                        <tr key={rental.id}>
                            <td>{rental.clientName}</td>
                            <td>{rental.vehicleBrand} - {rental.vehicleModel}</td>
                            <td>{formatDate(rental.startDate)}</td>
                            <td>{formatDate(rental.endDate)}</td>
                            <td>R$ {Number(rental.totalPrice).toFixed(2)}</td>
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => handleEdit(rental)}>Editar</button>
                                    <button onClick={() => handleDelete(rental.id)}>Excluir</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalsPage;