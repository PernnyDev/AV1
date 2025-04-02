const db = require('../config/dbConfig');

exports.getStats = async (req, res) => {
    try {
        // Total de veículos disponíveis
        const [vehicles] = await db.execute('SELECT COUNT(*) AS total FROM vehicles WHERE available = 1');
        const totalVehiclesAvailable = vehicles[0].total;

        // Total de clientes cadastrados
        const [clients] = await db.execute('SELECT COUNT(*) AS total FROM clients');
        const totalClients = clients[0].total;

        // Total de locações ativas
        const [rentals] = await db.execute('SELECT COUNT(*) AS total FROM rentals WHERE endDate >= CURDATE()');
        const totalActiveRentals = rentals[0].total;

        res.json({
            totalVehiclesAvailable,
            totalClients,
            totalActiveRentals,
        });
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        res.status(500).json({ error: 'Erro ao obter estatísticas.' });
    }
};