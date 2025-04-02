const db = require('../config/dbConfig');

const Rental = {
    getAllRentals: async () => {
        const [rows] = await db.execute(`
            SELECT rentals.*, 
                   clients.name AS clientName, 
                   vehicles.brand AS vehicleBrand, 
                   vehicles.model AS vehicleModel
            FROM rentals
            JOIN clients ON rentals.clientId = clients.id
            JOIN vehicles ON rentals.vehicleId = vehicles.id
        `);
        return rows;
    },

    createRental: async (rentalData) => {
        const query = `
            INSERT INTO rentals (clientId, vehicleId, startDate, endDate, totalPrice)
            VALUES (?, ?, ?, ?, ?)
        `;
        const { clientId, vehicleId, startDate, endDate, totalPrice } = rentalData;
        await db.execute(query, [clientId, vehicleId, startDate, endDate, totalPrice]);
    },

    updateRental: async (id, rentalData) => {
        const query = `
            UPDATE rentals
            SET clientId = ?, vehicleId = ?, startDate = ?, endDate = ?, totalPrice = ?
            WHERE id = ?
        `;
        const { clientId, vehicleId, startDate, endDate, totalPrice } = rentalData;
        await db.execute(query, [clientId, vehicleId, startDate, endDate, totalPrice, id]);
    },

    deleteRental: async (id) => {
        const query = 'DELETE FROM rentals WHERE id = ?';
        await db.execute(query, [id]);
    },
};

module.exports = Rental;