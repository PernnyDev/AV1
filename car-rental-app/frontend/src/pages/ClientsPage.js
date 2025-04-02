import React, { useEffect, useState } from 'react';
import { fetchClientsData, createClient, updateClient, deleteClient, fetchClientRentals } from '../services/api';
import './ClientsPage.css';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [editingClientId, setEditingClientId] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [rentalHistory, setRentalHistory] = useState([]);
    const [selectedClientName, setSelectedClientName] = useState('');

    useEffect(() => {
        const loadClients = async () => {
            try {
                const data = await fetchClientsData();
                setClients(data);
            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
            }
        };

        loadClients();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingClientId) {
                await updateClient(editingClientId, formData);
                alert('Cliente atualizado com sucesso!');
                setEditingClientId(null);
            } else {
                await createClient(formData);
                alert('Cliente cadastrado com sucesso!');
            }

            resetForm();
            const data = await fetchClientsData();
            setClients(data);
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            alert('Erro ao salvar cliente.');
        }
    };

    const handleEdit = (client) => {
        setEditingClientId(client.id);
        setFormData({
            name: client.name,
            email: client.email,
            phone: client.phone,
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await deleteClient(id);
                alert('Cliente excluído com sucesso!');
                const data = await fetchClientsData();
                setClients(data);
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente.');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
        });
        setEditingClientId(null);
    };

    const handleShowHistory = async (client) => {
        try {
            const rentals = await fetchClientRentals(client.id);
            setRentalHistory(rentals);
            setSelectedClientName(client.name);
            setShowHistory(true);
        } catch (error) {
            console.error('Erro ao carregar histórico de locações:', error);
            alert('Erro ao carregar histórico de locações.');
        }
    };

    const closeHistoryPopup = () => {
        setShowHistory(false);
        setRentalHistory([]);
        setSelectedClientName('');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
    };

    return (
        <div>
            <h1>Gerenciamento de Clientes</h1>

            {/* Formulário de Cadastro */}
            <form className="client-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {editingClientId ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                </button>
                <button type="button" onClick={resetForm}>
                    Resetar Formulário
                </button>
            </form>

            {/* Tabela de Clientes */}
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => handleEdit(client)}>Editar</button>
                                    <button onClick={() => handleDelete(client.id)}>Excluir</button>
                                    <button onClick={() => handleShowHistory(client)}>Histórico</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup de Histórico */}
            {showHistory && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Histórico de Locações - {selectedClientName}</h2>
                        <button className="close-popup" onClick={closeHistoryPopup}>
                            Fechar
                        </button>
                        {rentalHistory.length > 0 ? (
                            <ul>
                                {rentalHistory.map((rental) => (
                                    <li key={rental.id}>
                                        Veículo: {rental.brand} {rental.model} | Data: {formatDate(rental.startDate)} - {formatDate(rental.endDate)} | Preço: R$ {Number(rental.totalPrice).toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Não há histórico de locações para este cliente.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientsPage;