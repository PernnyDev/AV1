const Vehicle = require('../models/vehicleModel');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
    try {
        const { brand, model, year, plate, available, price } = req.body;
        await Vehicle.createVehicle({ brand, model, year, plate, available, price });
        res.status(201).json({ message: 'Veículo criado com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Placa já cadastrada. Use uma placa única.' });
        }
        console.error('Erro ao criar veículo:', error);
        res.status(500).json({ error: 'Erro ao criar veículo.' });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        console.log('Buscando todos os veículos...');
        const vehicles = await Vehicle.getAllVehicles();
        res.json(vehicles);
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        res.status(500).json({ error: 'Erro ao buscar veículos.' });
    }
};

// Get a vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
        console.log('ID recebido:', req.params.id); // Log do ID recebido
        const vehicle = await Vehicle.getVehicleById(req.params.id);
        console.log('Veículo encontrado:', vehicle); // Log do veículo encontrado
        if (!vehicle) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }
        res.json(vehicle);
    } catch (error) {
        console.error('Erro ao obter veículo:', error);
        res.status(500).json({ error: 'Erro ao obter veículo.' });
    }
};

// Update a vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model, year, plate, available, price } = req.body;
        await Vehicle.updateVehicle(id, { brand, model, year, plate, available, price });
        res.status(200).json({ message: 'Veículo atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        res.status(500).json({ error: 'Erro ao atualizar veículo.' });
    }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        await Vehicle.deleteVehicle(id); // Chama o modelo para excluir o veículo
        res.status(200).json({ message: 'Veículo excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir veículo:', error);
        res.status(500).json({ error: 'Erro ao excluir veículo.' });
    }
};