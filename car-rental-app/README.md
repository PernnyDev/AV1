# Car Rental Application

This project is a web application for managing car rentals, built using React for the frontend and Node.js for the backend. The application allows users to manage vehicles, clients, and rentals, with a responsive user interface and integration with Azure MySQL for data storage.

## Project Structure

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

## Features

1. **Vehicle Management**
   - Register new vehicles with details such as make, model, year, license plate, and availability.
   - Edit and delete existing vehicles.
   - Search for vehicles using filters like make, model, price, and availability.

2. **Client Management**
   - Register new clients with personal information and contact details.
   - Edit and delete existing clients.
   - View rental history for each client.

3. **Rental Management**
   - Create new rentals by selecting a vehicle, client, start and end dates, and rental price.
   - Edit and cancel existing rentals.

4. **User Interface**
   - Responsive and intuitive web interface for clients.
   - Client area for viewing rentals and editing personal data.

## Database Integration

The application uses Azure MySQL for storing client, vehicle, and rental records. The database configuration is set up in `backend/src/config/dbConfig.js`.

## Installation and Running the Project

1. Navigate to the backend folder and install dependencies:
   ```
   cd backend
   npm install
   ```

2. Navigate to the frontend folder and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

3. To run the backend, execute:
   ```
   cd backend
   node src/app.js
   ```

4. To run the frontend, execute:
   ```
   cd frontend
   npm start
   ```

## License

This project is licensed under the MIT License.