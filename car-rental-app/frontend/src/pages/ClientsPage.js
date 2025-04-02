import React, { useEffect, useState } from 'react';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import { fetchClientsData, deleteClient } from '../services/api';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    const refreshClients = async () => {
        try {
            const data = await fetchClientsData();
            setClients(data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    useEffect(() => {
        refreshClients();
    }, []);

    const handleEdit = (client) => {
        setSelectedClient(client);
    };

    const handleDelete = async (id) => {
        try {
            await deleteClient(id);
            alert('Cliente excluído com sucesso!');
            refreshClients();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            alert('Erro ao excluir cliente.');
        }
    };

    return (
        <div>
            <h1>Gerenciamento de Clientes</h1>
            <ClientForm
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                refreshClients={refreshClients}
            />
            <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ClientsPage;