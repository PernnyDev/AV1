// backend/src/controllers/rentalController.js

const Rental = require('../models/rentalModel');

exports.getAllRentals = async (req, res) => {
    try {
        console.log('Buscando todas as locações...');
        const rentals = await Rental.getAllRentals();
        res.json(rentals);
    } catch (error) {
        console.error('Erro ao buscar locações:', error);
        res.status(500).json({ error: 'Erro ao buscar locações.' });
    }
};

exports.createRental = async (req, res) => {
    try {
        const { clientId, vehicleId, startDate, endDate, totalPrice } = req.body;

        if (!clientId || !vehicleId || !startDate || !endDate || !totalPrice) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        await Rental.createRental({ clientId, vehicleId, startDate, endDate, totalPrice });
        res.status(201).json({ message: 'Locação criada com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar locação:', error);
        res.status(500).json({ error: 'Erro ao criar locação.' });
    }
};

exports.getRentalById = async (req, res) => {
    console.log('Rota de locações chamada');
    try {
        const rental = await Rental.getRentalById(req.params.id);
        if (!rental) {
            return res.status(404).json({ error: 'Locação não encontrada.' });
        }
        res.json(rental);
    } catch (error) {
        console.error('Erro ao obter locação:', error);
        res.status(500).json({ error: 'Erro ao obter locação.' });
    }
};

exports.updateRental = async (req, res) => {
    try {
        const { id } = req.params;
        const { clientId, vehicleId, startDate, endDate, totalPrice } = req.body;

        if (!clientId || !vehicleId || !startDate || !endDate || !totalPrice) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        await Rental.updateRental(id, { clientId, vehicleId, startDate, endDate, totalPrice });
        res.status(200).json({ message: 'Locação atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar locação:', error);
        res.status(500).json({ error: 'Erro ao atualizar locação.' });
    }
};

exports.deleteRental = async (req, res) => {
    try {
        const { id } = req.params;
        await Rental.deleteRental(id);
        res.status(200).json({ message: 'Locação excluída com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir locação:', error);
        res.status(500).json({ error: 'Erro ao excluir locação.' });
    }
};