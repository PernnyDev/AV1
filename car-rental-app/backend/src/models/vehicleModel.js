const db = require('../config/dbConfig');

const Vehicle = {
    createVehicle: async (vehicleData) => {
        const query = `
            INSERT INTO vehicles (brand, model, year, plate, available, price)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const { brand, model, year, plate, available, price } = vehicleData;
        await db.execute(query, [brand, model, year, plate, available, price]);
    },

    getAllVehicles: async () => {
        const [rows] = await db.execute('SELECT * FROM vehicles');
        return rows;
    },

    getVehicleById: async (id) => {
        try {
            const [rows] = await db.execute('SELECT * FROM vehicles WHERE id = ?', [id]);
            return rows[0]; // Retorna o primeiro registro encontrado
        } catch (error) {
            console.error('Erro ao buscar veículo no banco de dados:', error); // Log do erro no terminal
            throw error; // Lança o erro para o controlador
        }
    },

    updateVehicle: async (id, vehicleData) => {
        const query = `
            UPDATE vehicles
            SET brand = ?, model = ?, year = ?, plate = ?, available = ?, price = ?
            WHERE id = ?
        `;
        const { brand, model, year, plate, available, price } = vehicleData;
        await db.execute(query, [brand, model, year, plate, available, price, id]);
    },

    deleteVehicle: async (id) => {
        const query = 'DELETE FROM vehicles WHERE id = ?';
        await db.execute(query, [id]);
    },
};

module.exports = Vehicle;