# Aplicação de Gerenciamento de Locadora de Veículos

Este projeto é uma aplicação web para gerenciamento de locações de veículos, construída com React no frontend e Node.js no backend. A aplicação permite gerenciar veículos, clientes e locações, com uma interface responsiva e integração com o banco de dados Azure MySQL para armazenamento de dados.

## Estrutura do Projeto
```
car-rental-app
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── clientController.js
│   │   │   ├── rentalController.js
│   │   │   └── vehicleController.js
│   │   ├── models
│   │   │   ├── clientModel.js
│   │   │   ├── rentalModel.js
│   │   │   └── vehicleModel.js
│   │   ├── routes
│   │   │   ├── clientRoutes.js
│   │   │   ├── rentalRoutes.js
│   │   │   └── vehicleRoutes.js
│   │   ├── config
│   │   │   └── dbConfig.js
│   │   └── app.js
│   └── package.json
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── ClientForm.js
│   │   │   ├── RentalForm.js
│   │   │   ├── VehicleForm.js
│   │   │   ├── ClientList.js
│   │   │   ├── RentalList.js
│   │   │   └── VehicleList.js
│   │   ├── pages
│   │   │   ├── HomePage.js
│   │   │   ├── ClientsPage.js
│   │   │   ├── RentalsPage.js
│   │   │   └── VehiclesPage.js
│   │   ├── services
│   │   │   ├── api.js
│   │   │   └── azureMysqlService.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
```

## Funcionalidades

### 1. Gerenciamento de Veículos
- Cadastro de novos veículos com informações como marca, modelo, ano, placa, disponibilidade e preço.
- Edição e exclusão de veículos existentes.
- Filtro de veículos por marca, modelo, preço e disponibilidade.
- Listagem de veículos com informações detalhadas.

### 2. Gerenciamento de Clientes
- Cadastro de novos clientes com informações pessoais e de contato.
- Edição e exclusão de clientes existentes.
- Visualização do histórico de locações de cada cliente.

### 3. Gerenciamento de Locações
- Criação de novas locações selecionando veículo, cliente, datas de início e término, e preço da locação.
- Edição e cancelamento de locações existentes.
- Listagem de locações com informações detalhadas.

### 4. Interface do Usuário
- Interface web responsiva e intuitiva.
- Área de cliente para visualização de locações e edição de dados pessoais.
- Tela inicial com estatísticas em tempo real, como:
   - Total de veículos disponíveis.
   - Total de clientes cadastrados.
   - Total de locações ativas.

## Banco de Dados
A aplicação utiliza o banco de dados Azure MySQL para armazenar os registros de clientes, veículos e locações. A configuração do banco de dados está localizada no arquivo `backend/src/config/dbConfig.js`.

## Como Executar o Projeto

### 1. Configuração do Backend
- Navegue até a pasta do backend
- Instale as dependências
- Configure o banco de dados no arquivo `src/config/dbConfig.js` com as credenciais do Azure MySQL
- Inicie o servidor backend

### 2. Configuração do Frontend
- Navegue até a pasta do frontend
- Instale as dependências
- Inicie o servidor frontend

## Como o Sistema Ficou no Final

### Tela Inicial (Home)
- Exibe estatísticas em tempo real:
   - Total de veículos disponíveis.
   - Total de clientes cadastrados.
   - Total de locações ativas.
- Links para as páginas de gerenciamento de veículos, clientes e locações.

### Tela de Gerenciamento de Veículos
- Formulário para cadastro de novos veículos.
- Filtros para busca de veículos por marca, modelo, preço e disponibilidade.
- Tabela com listagem de veículos cadastrados.

### Tela de Gerenciamento de Clientes
- Formulário para cadastro de novos clientes.
- Tabela com listagem de clientes cadastrados.
- Opção para visualizar o histórico de locações de cada cliente.

### Tela de Gerenciamento de Locações
- Formulário para criação de novas locações.
- Tabela com listagem de locações ativas e concluídas.
- Opções para editar ou cancelar locações.

## Resumo de prompts
Para chegarmos a esse resultado, foram necessários 42 prompts (ou interações). Cada prompt representou uma solicitação ou ajuste que você fez ao longo do desenvolvimento e melhoria do projeto
