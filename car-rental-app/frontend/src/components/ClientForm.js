import React, { useState, useEffect } from 'react';
import { createClient, updateClient } from '../services/api';

const ClientForm = ({ selectedClient, setSelectedClient, refreshClients }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (selectedClient) {
            setFormData(selectedClient);
        }
    }, [selectedClient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedClient) {
                await updateClient(selectedClient.id, formData);
                alert('Cliente atualizado com sucesso!');
            } else {
                await createClient(formData);
                alert('Cliente criado com sucesso!');
            }
            setFormData({ name: '', email: '', phone: '' });
            setSelectedClient(null);
            refreshClients();
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            alert('Erro ao salvar cliente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite o nome"
            />
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite o email"
            />
            <label>Telefone:</label>
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Digite o telefone"
            />
            <button type="submit">Salvar Cliente</button>
        </form>
    );
};

export default ClientForm;