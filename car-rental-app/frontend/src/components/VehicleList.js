import React from 'react';
import './VehicleList.css';

const VehicleList = ({ vehicles, onEdit, onDelete }) => {
    console.log('Veículos recebidos no VehicleList:', vehicles);

    return (
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
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                        <td>{vehicle.brand}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.plate}</td>
                        <td>{vehicle.available ? 'Sim' : 'Não'}</td>
                        <td>{vehicle.price}</td>
                        <td>
                            <button onClick={() => onEdit(vehicle)}>Editar</button>
                            <button onClick={() => onDelete(vehicle.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VehicleList;