import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL do backend

// Funções para gerenciar veículos
export const getVehicles = async () => {
    const response = await axios.get(`${API_URL}/vehicles`);
    return response.data;
};

export const createVehicle = async (vehicleData) => {
    const response = await axios.post(`${API_URL}/vehicles`, vehicleData);
    return response.data;
};

export const updateVehicle = async (vehicleId, vehicleData) => {
    const response = await axios.put(`${API_URL}/vehicles/${vehicleId}`, vehicleData);
    return response.data;
};

export const deleteVehicle = async (vehicleId) => {
    const response = await axios.delete(`${API_URL}/vehicles/${vehicleId}`);
    return response.data;
};

// Funções para gerenciar clientes
export const getClients = async () => {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
};

export const createClient = async (clientData) => {
    const response = await axios.post(`${API_URL}/clients`, clientData);
    return response.data;
};

export const updateClient = async (clientId, clientData) => {
    const response = await axios.put(`${API_URL}/clients/${clientId}`, clientData);
    return response.data;
};

export const deleteClient = async (clientId) => {
    const response = await axios.delete(`${API_URL}/clients/${clientId}`);
    return response.data;
};

// Funções para gerenciar locações
export const getRentals = async () => {
    const response = await axios.get(`${API_URL}/rentals`);
    return response.data;
};

export const createRental = async (rentalData) => {
    const response = await axios.post(`${API_URL}/rentals`, rentalData);
    return response.data;
};

export const updateRental = async (rentalId, rentalData) => {
    const response = await axios.put(`${API_URL}/rentals/${rentalId}`, rentalData);
    return response.data;
};

export const deleteRental = async (rentalId) => {
    const response = await axios.delete(`${API_URL}/rentals/${rentalId}`);
    return response.data;
};