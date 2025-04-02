import axios from 'axios';

const api = axios.create({
    baseURL: 'http://servermysqlcn1.mysql.database.azure.com/api', // URL base da API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Funções para gerenciar veículos
export const getVehicles = () => api.get('/vehicles');
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
export const createVehicle = async (vehicle) => {
    const response = await fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar veículo');
    }

    return response.json();
};
export const updateVehicle = async (id, vehicle) => {
    const response = await fetch(`http://localhost:5000/api/vehicles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar veículo');
    }

    return response.json();
};
export const deleteVehicle = async (id) => {
    const response = await fetch(`http://localhost:5000/api/vehicles/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir veículo');
    }

    return response.json();
};
export const fetchVehiclesData = async () => {
    const response = await fetch('http://localhost:5000/api/vehicles');
    if (!response.ok) {
        throw new Error('Erro ao buscar veículos');
    }
    return response.json();
};
// Funções para gerenciar clientes
export const getClients = () => api.get('/clients');
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = async (client) => {
    const response = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar cliente');
    }

    return response.json();
};
export const updateClient = async (id, client) => {
    const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar cliente');
    }

    return response.json();
};
export const deleteClient = async (id) => {
    const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir cliente');
    }

    return response.json();
};
export const fetchClientsData = async () => {
    const response = await fetch('http://localhost:5000/api/clients');
    if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
    }
    return response.json();
};

// Funções para gerenciar locações
export const getRentals = () => api.get('/rentals');
export const getRentalById = (id) => api.get(`/rentals/${id}`);
export const fetchRentalsData = async () => {
    const response = await fetch('http://localhost:5000/api/rentals');
    if (!response.ok) {
        throw new Error('Erro ao buscar locações');
    }
    return response.json();
};

export const createRental = async (rental) => {
    const response = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rental),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar locação');
    }

    return response.json();
};

export const updateRental = async (id, rental) => {
    const response = await fetch(`http://localhost:5000/api/rentals/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rental),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar locação');
    }

    return response.json();
};

export const deleteRental = async (id) => {
    const response = await fetch(`http://localhost:5000/api/rentals/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir locação');
    }

    return response.json();
};

export const fetchStats = async () => {
    const response = await fetch('http://localhost:5000/api/stats');
    if (!response.ok) {
        throw new Error('Erro ao buscar estatísticas');
    }
    return response.json();
};