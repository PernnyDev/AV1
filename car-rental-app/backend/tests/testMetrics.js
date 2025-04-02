const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

const testMetrics = async () => {
    try {
        console.log('Iniciando testes de métricas...');

        // Gerar um e-mail único usando timestamp
        const uniqueEmail = `teste${Date.now()}@cliente.com`;

        console.time('Criar Cliente');
        const clientResponse = await axios.post(`${API_BASE_URL}/clients`, {
            name: 'Teste Cliente',
            email: uniqueEmail, // E-mail único
            phone: '123456789',
        });
        console.timeEnd('Criar Cliente');
        console.log('Cliente criado:', clientResponse.data);

        // Gerar uma placa única usando timestamp
        const uniquePlate = `ABC-${Date.now().toString().slice(-4)}`;

        // Métrica: Criar Veículo
        console.time('Criar Veículo');
        const vehicleResponse = await axios.post(`${API_BASE_URL}/vehicles`, {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2022,
            plate: uniquePlate, // Placa única
            available: true,
            price: 100.0,
        });
        console.timeEnd('Criar Veículo');
        console.log('Veículo criado:', vehicleResponse.data);

        // Criar Locação
        console.time('Criar Locação');
        const rentalResponse = await axios.post(`${API_BASE_URL}/rentals`, {
            clientId: clientResponse.data.id, // ID do cliente criado
            vehicleId: vehicleResponse.data.id, // ID do veículo criado
            startDate: '2025-04-01',
            endDate: '2025-04-05',
            totalPrice: 500.0,
        });
        console.timeEnd('Criar Locação');
        console.log('Locação criada:', rentalResponse.data);

        // Métrica: Listar Locações
        console.time('Listar Locações');
        const rentalsList = await axios.get(`${API_BASE_URL}/rentals`);
        console.timeEnd('Listar Locações');
        console.log('Total de locações:', rentalsList.data.length);

        // Métrica: Atualizar Locação
        console.time('Atualizar Locação');
        const updatedRental = await axios.put(`${API_BASE_URL}/rentals/${rentalResponse.data.id}`, {
            clientId: clientResponse.data.id,
            vehicleId: vehicleResponse.data.id,
            startDate: '2025-04-02',
            endDate: '2025-04-06',
            totalPrice: 600.0,
        });
        console.timeEnd('Atualizar Locação');
        console.log('Locação atualizada:', updatedRental.data);

        // Métrica: Excluir Locação
        console.time('Excluir Locação');
        await axios.delete(`${API_BASE_URL}/rentals/${rentalResponse.data.id}`);
        console.timeEnd('Excluir Locação');
        console.log('Locação excluída com sucesso.');

        console.log('Testes de métricas concluídos.');
    } catch (error) {
        console.error('Erro durante os testes:', error.response ? error.response.data : error.message);
    }
};

testMetrics();