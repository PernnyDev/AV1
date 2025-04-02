import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await axios.get('/api/rentals');
                setRentals(response.data);
            } catch (error) {
                console.error('Error fetching rentals:', error);
            }
        };

        fetchRentals();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/rentals/${id}`);
            setRentals(rentals.filter(rental => rental.id !== id));
        } catch (error) {
            console.error('Error deleting rental:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Locações</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map(rental => (
                        <tr key={rental.id}>
                            <td>{rental.id}</td>
                            <td>{rental.clientName}</td>
                            <td>{rental.vehicleModel}</td>
                            <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                            <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleDelete(rental.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalList;