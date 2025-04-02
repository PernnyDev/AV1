const db = require('../config/dbConfig');

exports.getAllRentals = async () => {
    const [rows] = await db.execute(
        `SELECT r.id, r.startDate, r.endDate, r.totalPrice, 
                c.id AS clientId, c.name AS clientName, 
                v.id AS vehicleId, v.brand AS vehicleBrand, v.model AS vehicleModel
         FROM rentals r
         JOIN clients c ON r.clientId = c.id
         JOIN vehicles v ON r.vehicleId = v.id`
    );
    return rows;
};

exports.getRentalsByClientId = async (clientId) => {
    const [rows] = await db.execute(
        `SELECT r.id, v.brand, v.model, r.startDate, r.endDate, r.totalPrice
         FROM rentals r
         JOIN vehicles v ON r.vehicleId = v.id
         WHERE r.clientId = ?`,
        [clientId]
    );
    return rows;
};

exports.createRental = async ({ clientId, vehicleId, startDate, endDate, totalPrice }) => {
    const [result] = await db.execute(
        `INSERT INTO rentals (clientId, vehicleId, startDate, endDate, totalPrice)
         VALUES (?, ?, ?, ?, ?)`,
        [clientId, vehicleId, startDate, endDate, totalPrice]
    );
    return result;
};

exports.updateRental = async (id, { clientId, vehicleId, startDate, endDate, totalPrice }) => {
    const [result] = await db.execute(
        `UPDATE rentals
         SET clientId = ?, vehicleId = ?, startDate = ?, endDate = ?, totalPrice = ?
         WHERE id = ?`,
        [clientId, vehicleId, startDate, endDate, totalPrice, id]
    );
    return result;
};

exports.deleteRental = async (id) => {
    const [result] = await db.execute(
        `DELETE FROM rentals WHERE id = ?`,
        [id]
    );
    return result;
};