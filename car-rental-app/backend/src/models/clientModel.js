const db = require('../config/dbConfig');

const Client = {
    createClient: async (clientData) => {
        const query = `
            INSERT INTO clients (name, email, phone)
            VALUES (?, ?, ?)
        `;
        const { name, email, phone } = clientData;
        await db.execute(query, [name, email, phone]);
    },

    getAllClients: async () => {
        const [rows] = await db.execute('SELECT * FROM clients');
        return rows;
    },

    getClientById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM clients WHERE id = ?', [id]);
        return rows[0];
    },

    updateClient: async (id, clientData) => {
        const query = `
            UPDATE clients
            SET name = ?, email = ?, phone = ?
            WHERE id = ?
        `;
        const { name, email, phone } = clientData;
        await db.execute(query, [name, email, phone, id]);
    },

    deleteClient: async (id) => {
        await db.execute('DELETE FROM clients WHERE id = ?', [id]);
    },
};

module.exports = Client;