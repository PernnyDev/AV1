import React, { useEffect, useState } from 'react';
import { fetchRentalsData, deleteRental } from '../services/api';
import RentalForm from '../components/RentalForm';

const RentalsPage = () => {
    const [rentals, setRentals] = useState([]);
    const [selectedRental, setSelectedRental] = useState(null);

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
    };

    const handleDelete = async (id) => {
        try {
            await deleteRental(id);
            alert('Locação excluída com sucesso!');
            refreshRentals();
        } catch (error) {
            console.error('Erro ao excluir locação:', error);
            alert('Erro ao excluir locação.');
        }
    };

    return (
        <div>
            <h1>Gerenciamento de Locações</h1>
            <RentalForm
                selectedRental={selectedRental}
                setSelectedRental={setSelectedRental}
                refreshRentals={refreshRentals}
            />
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Data de Início</th>
                        <th>Data de Término</th>
                        <th>Preço Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental) => (
                        <tr key={rental.id}>
                            <td>{rental.clientName}</td>
                            <td>{rental.vehicleBrand} - {rental.vehicleModel}</td>
                            <td>{rental.startDate}</td>
                            <td>{rental.endDate}</td>
                            <td>{rental.totalPrice}</td>
                            <td>
                                <button onClick={() => handleEdit(rental)}>Editar</button>
                                <button onClick={() => handleDelete(rental.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalsPage;