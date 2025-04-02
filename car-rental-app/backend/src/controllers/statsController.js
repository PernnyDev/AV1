const db = require('../config/dbConfig');

exports.getStats = async (req, res) => {
    try {
        const [[vehicles]] = await db.execute(`SELECT COUNT(*) AS total FROM vehicles WHERE available = 1`);
        const [[clients]] = await db.execute(`SELECT COUNT(*) AS total FROM clients`);
        const [[rentals]] = await db.execute(`SELECT COUNT(*) AS total FROM rentals WHERE endDate >= CURDATE()`);

        res.json({
            vehiclesAvailable: vehicles.total,
            clientsRegistered: clients.total,
            activeRentals: rentals.total,
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
    }
};