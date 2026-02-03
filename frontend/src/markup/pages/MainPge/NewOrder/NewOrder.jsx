// src/components/NewOrder.js
import React, { useState, useEffect } from 'react';
import './NewOrder.css';

const NewOrder = () => {
const [customer, setCustomer] = useState(null);
const [vehicles, setVehicles] = useState([]);
const [selectedVehicle, setSelectedVehicle] = useState(null);

useEffect(() => {
    // Fetch customer and vehicle data from the backend
    fetchCustomerData();
    fetchVehicleData();
}, []);

const fetchCustomerData = async () => {
    // Replace with your API endpoint
    const response = await fetch('/api/customer/1');
    const data = await response.json();
    setCustomer(data);
};

const fetchVehicleData = async () => {
    // Replace with your API endpoint
    const response = await fetch('/api/vehicles');
    const data = await response.json();
    setVehicles(data);
};

const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
};

const handleSubmit = async () => {
    // Create a new order with the selected vehicle
    const orderData = {
    customerId: customer.id,
    vehicleId: selectedVehicle.id,
    };
    // Replace with your API endpoint
    const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
    });
    if (response.ok) {
    alert('Order created successfully');
    } else {
    alert('Failed to create order');
    }
};

return (
    <div className="container">
    <h2 className="title">Create a new order</h2>
    {customer && (
        <div className="customer-info">
        <p>Name: {customer.name}</p>
        <p>Email: {customer.email}</p>
        <p>Phone Number: {customer.phone}</p>
        <p>Active Customer: {customer.active ? 'Yes' : 'No'}</p>
        </div>
    )}
    <h3 className="title">Choose a vehicle</h3>
    <table className="vehicle-table">
        <thead>
        <tr>
            <th>Year</th>
            <th>Make</th>
            <th>Model</th>
            <th>Tag</th>
            <th>Serial</th>
            <th>Color</th>
            <th>Mileage</th>
            <th>Choose</th>
        </tr>
        </thead>
        <tbody>
        {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
            <td>{vehicle.year}</td>
            <td>{vehicle.make}</td>
            <td>{vehicle.model}</td>
            <td>{vehicle.tag}</td>
            <td>{vehicle.serial}</td>
            <td>{vehicle.color}</td>
            <td>{vehicle.mileage}</td>
            <td>
                <button className="button" onClick={() => handleVehicleSelect(vehicle)}>Choose</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    <button className="button" onClick={handleSubmit} disabled={!selectedVehicle}>
        Submit Order
    </button>
    </div>
);
};

export default NewOrder;
