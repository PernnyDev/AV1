const Client = require('../models/clientModel');

exports.createClient = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        await Client.createClient({ name, email, phone });
        res.status(201).json({ message: 'Cliente criado com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'E-mail já cadastrado. Use um e-mail único.' });
        }
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro ao criar cliente.' });
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.getAllClients();
        res.json(clients);
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        res.status(500).json({ error: 'Erro ao obter clientes.' });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.getClientById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado.' });
        }
        res.json(client);
    } catch (error) {
        console.error('Erro ao obter cliente:', error);
        res.status(500).json({ error: 'Erro ao obter cliente.' });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        await Client.updateClient(id, { name, email, phone });
        res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente.' });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        await Client.deleteClient(req.params.id);
        res.status(200).json({ message: 'Cliente excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ error: 'Erro ao excluir cliente.' });
    }
};