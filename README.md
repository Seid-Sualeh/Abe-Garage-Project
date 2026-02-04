# 🚗 Abe Garage Management System

<div align="center">

![Abe Garage Logo](frontend/src/assets/images/custom/logo.png)

**A comprehensive, modern, and full-featured Garage Management System built with React, Node.js, Express, and MySQL**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-21.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Tech Stack](#-tech-stack)
- [📊 Database Schema](#-database-schema)
- [🔐 Security](#-security)
- [🎨 UI/UX](#-uiux)
- [📝 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 👥 Customer Management
- **Customer Registration** - Register new customers with complete contact information
- **Customer Profiles** - View and manage detailed customer profiles
- **Customer Search** - Quick search functionality for existing customers
- **Customer Status** - Track active/inactive customer accounts

### 🚙 Vehicle Management
- **Vehicle Registration** - Add multiple vehicles per customer
- **Vehicle Details** - Track make, model, year, mileage, color, VIN, and license plate
- **Vehicle History** - Complete service history per vehicle
- **Multi-Vehicle Support** - Manage families or businesses with multiple vehicles

### 👨‍🔧 Employee Management
- **Employee Registration** - Add staff members with role-based access
- **Role-Based Access Control (RBAC)** - Three tiers: Employee, Manager, Admin
- **Employee Profiles** - Manage employee contact and account details
- **Activity Tracking** - Monitor employee additions and modifications

### 📋 Order & Service Management
- **Service Orders** - Create and manage repair/service orders
- **Service Selection** - Choose from predefined services or create custom orders
- **Order Tracking** - Track order status from creation to completion
- **Order History** - Complete order history for customers and vehicles
- **Notes & Comments** - Internal notes and customer-facing communications
- **Estimated Completion** - Set and track estimated completion dates

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access** - Granular permissions based on employee roles
- **Password Security** - bcrypt password hashing
- **Input Sanitization** - Protection against SQL injection and XSS attacks
- **Session Management** - Automatic session handling with React Context

### 🎯 Public Features
- **Service Catalog** - Public-facing services page
- **Online Booking** - Customers can request new service orders
- **Order Status Tracking** - Check order status without logging in
- **Contact Form** - Easy communication with the garage
- **Responsive Design** - Works on all devices

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Abe Garage System                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────┐         ┌──────────────────┐                 │
│   │     Frontend     │  <--->  │     Backend      │                 │
│   │   (React + Vite) │  REST   │  (Node + Express)│                 │
│   └──────────────────┘         └──────────────────┘                 │
│           │                            │                             │
│           │                            │                             │
│   ┌───────▼────────────────────────────▼──────────────┐             │
│   │              React Context & State                │             │
│   │              (Auth, Theme, Data)                  │             │
│   └────────────────────────────────────────────────────┘             │
│                                  │                                     │
│   ┌──────────────────────────────▼──────────────────────────┐        │
│   │                   MySQL Database                         │        │
│   │         (Customers, Employees, Vehicles, Orders)         │        │
│   └───────────────────────────────────────────────────────────┘        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ 
- **MySQL** 8.0+
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Abe-Garage-Project
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure Environment Variables**

   **Backend (.env)**
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=abe_garage

   # Server Configuration
   PORT=3000
   FRONTEND_URL=http://localhost:5173

   # Security
   JWT_SECRET=your-super-secret-jwt-key
   ```

5. **Initialize Database**
   ```bash
   # Create the database and tables using MySQL Workbench or CLI
   # Run the SQL commands from backend/sql/initial-queries.sql
   ```

6. **Start Development Servers**

   **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

---

## 📁 Project Structure

```
Abe-Garage-Project/
├── backend/                    # Backend API Server
│   ├── config/                 # Database configuration
│   │   └── db.config.js       # MySQL connection pool
│   ├── controller/             # Request handlers
│   │   ├── customer.controller.js
│   │   ├── employee.controller.js
│   │   ├── login.controlller.js
│   │   ├── order.controller.js
│   │   ├── service.controller.js
│   │   ├── vehicle.controller.js
│   │   └── install.controller.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.middleware.js  # JWT verification
│   ├── routes/                # API route definitions
│   │   ├── customer.routes.js
│   │   ├── employee.routes.js
│   │   ├── login.routes.js
│   │   ├── order.routes.js
│   │   ├── service.routes.js
│   │   └── vehicle.routes.js
│   ├── services/              # Business logic layer
│   │   ├── customer.service.js
│   │   ├── employee.service.js
│   │   ├── login.service.js
│   │   ├── order.service.js
│   │   ├── service.service.js
│   │   └── vehicle.service.js
│   ├── sql/                   # Database scripts
│   │   └── initial-queries.sql
│   ├── app.js                 # Express app entry point
│   └── package.json
│
├── frontend/                   # React Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/        # Custom images and icons
│   │   │   ├── js/           # Third-party JavaScript
│   │   │   ├── styles/       # Custom CSS styles
│   │   │   └── template_assets/  # Template assets
│   │   ├── context/           # React Context providers
│   │   │   └── Auth.jsx      # Authentication context
│   │   ├── markup/            # React components and pages
│   │   │   ├── components/   # Reusable components
│   │   │   │   ├── Admin/    # Admin-specific components
│   │   │   │   ├── Auth/     # Authentication components
│   │   │   │   ├── MainComponents/  # Main site components
│   │   │   │   └── OtherComponents/ # Shared components
│   │   │   └── pages/        # Page components
│   │   │       ├── admin/    # Admin dashboard pages
│   │   │       ├── MainPge/  # Public-facing pages
│   │   │       └── servicesAPI/  # API service layer
│   │   ├── utils/            # Utility functions
│   │   │   ├── auth.jsx      # Auth utilities
│   │   │   └── axiosConfig.js  # Axios configuration
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html            # HTML entry point
│   ├── vite.config.js       # Vite configuration
│   └── package.json
│
└── README.md                  # This file
```

---

## 🔧 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite** | Build tool and dev server |
| **React Router DOM** | Client-side routing |
| **React Context** | Global state management |
| **MUI (Material UI)** | UI Component library |
| **React Bootstrap** | Bootstrap components |
| **React Toastify** | Toast notifications |
| **date-fns** | Date formatting utilities |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework |
| **MySQL 2** | Database driver |
| **bcrypt** | Password hashing |
| **jsonwebtoken** | JWT authentication |
| **nodemailer** | Email sending (optional) |
| **sanitize** | Input sanitization |
| **cors** | Cross-origin resource sharing |

### Database
| Technology | Purpose |
|------------|---------|
| **MySQL 8** | Relational database |
| **InnoDB** | Storage engine |

---

## 📊 Database Schema

### Core Tables

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   customer_     │       │    employee     │       │   common_       │
│   identifier    │       │                 │       │   services      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ customer_id (PK)│       │ employee_id    │       │ service_id (PK) │
│ customer_email  │       │ employee_email  │       │ service_name    │
│ customer_phone  │       │ active_employee │       │ service_desc    │
│ customer_added_ │       │ added_date      │       └─────────────────┘
│ date            │       └─────────────────┘
│ customer_hash   │               │
└─────────────────┘               │
        │                         │
        │                         ▼
        │               ┌─────────────────┐
        │               │ employee_info   │
        │               ├─────────────────┤
        │               │ employee_info_id│
        │               │ employee_id (FK)│
        │               │ employee_fname  │
        │               │ employee_lname  │
        │               │ employee_phone  │
        │               └─────────────────┘
        │
        ▼
┌─────────────────┐       ┌─────────────────┐
│ customer_info   │       │customer_vehicle│
├─────────────────┤       │    _info        │
│ customer_info_id│       ├─────────────────┤
│ customer_id (FK)│       │ vehicle_id (PK)│
│ customer_fname  │       │ customer_id (FK)│
│ customer_lname  │       │ vehicle_year   │
│ active_status   │       │ vehicle_make   │
└─────────────────┘       │ vehicle_model  │
                         │ vehicle_type    │
                         │ vehicle_mileage │
                         │ vehicle_tag     │
                         │ vehicle_serial  │
                         │ vehicle_color   │
                         └─────────────────┘

┌─────────────────────────────────────────────────────────┐
│                        orders                            │
├─────────────────────────────────────────────────────────┤
│ order_id (PK)          │ employee_id (FK)              │
│ customer_id (FK)       │ vehicle_id (FK)               │
│ order_date             │ active_order                  │
│ order_hash             │                               │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐       ┌─────────────────┐
│   order_info    │       │ order_services  │
├─────────────────┤       ├─────────────────┤
│ order_info_id   │       │ order_service_id│
│ order_id (FK)   │       │ order_id (FK)   │
│ order_total_price│       │ service_id (FK) │
│ estimated_comp_ │       │ service_         │
│ date            │       │ completed        │
│ completion_date │       └─────────────────┘
│ additional_req  │
│ internal_notes  │
│ customer_notes  │
└─────────────────┘
```

### Role-Based Access Control

| Role ID | Role Name | Permissions |
|---------|-----------|-------------|
| 1 | Employee | View orders, create orders, view customers |
| 2 | Manager | All Employee permissions + Add customers, manage orders |
| 3 | Admin | Full access + Add/Edit employees, manage services |

---

## 🔐 Security Features

### Authentication
- **JWT Tokens** with 1-week expiration
- **Secure Password Storage** using bcrypt (10 rounds)
- **Automatic Token Validation** on protected routes

### Input Validation
- **Server-side validation** on all API endpoints
- **SQL Injection Prevention** using parameterized queries
- **XSS Protection** via input sanitization
- **Client-side validation** with error feedback

### Access Control
- **Role-Based Route Protection** (PrivateAuthRoute component)
- **API Endpoint Authorization** (auth middleware)
- **Unauthorized Access Redirection**

---

## 🎨 UI/UX Highlights

### Design Features
- **Modern Responsive Layout** - Works on all screen sizes
- **Professional Color Scheme** - Clean, automotive-themed design
- **Animated Transitions** - Smooth page transitions
- **Loading States** - Visual feedback during data fetching
- **Toast Notifications** - Non-intrusive success/error messages
- **Modal Dialogs** - Clean forms and confirmations

### Component Library
- **Custom Header/Footer** - Consistent navigation
- **Data Tables** - Sortable, searchable tables
- **Forms** - Validated input with error messages
- **Cards** - Profile and information cards
- **CTA Sections** - Call-to-action components

---

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/login` | Employee login | Public |

### Customer Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/customers` | Get all customers | Manager/Admin |
| POST | `/api/customers` | Add customer | Manager/Admin |
| GET | `/api/customers/:id` | Get customer profile | Manager/Admin |
| PUT | `/api/customers/:id` | Update customer | Admin |
| DELETE | `/api/customers/:id` | Delete customer | Admin |

### Employee Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/employees` | Get all employees | Manager/Admin |
| POST | `/api/employees` | Add employee | Admin |
| GET | `/api/employees/:id` | Get employee profile | Manager/Admin |
| PUT | `/api/employees/:id` | Update employee | Admin |
| DELETE | `/api/employees/:id` | Delete employee | Admin |

### Vehicle Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/vehicles` | Get all vehicles | All |
| POST | `/api/vehicles` | Add vehicle | Manager/Admin |
| GET | `/api/vehicles/:id` | Get vehicle details | All |
| PUT | `/api/vehicles/:id` | Update vehicle | Manager/Admin |
| DELETE | `/api/vehicles/:id` | Delete vehicle | Admin |

### Order Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/orders` | Get all orders | All |
| POST | `/api/orders` | Create new order | Manager/Admin |
| GET | `/api/orders/:id` | Get order details | All |
| PUT | `/api/orders/:id` | Update order | Manager/Admin |
| GET | `/api/orders/status/:hash` | Check order status | Public |

### Service Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/services` | Get all services | All |
| POST | `/api/services` | Add service | Admin |
| PUT | `/api/services/:id` | Update service | Admin |
| DELETE | `/api/services/:id` | Delete service | Admin |

---

## 📦 Build & Deployment

### Production Build

```bash
# Frontend
cd frontend
npm run build

# Backend (for production)
cd backend
npm start
```

### Docker Deployment (Optional)

```dockerfile
# Example docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=password
      - DB_NAME=abe_garage

  frontend:
    build: ./frontend
    ports:
      - "80:80"

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=abe_garage
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 📈 Future Enhancements

- [ ] **Email Notifications** - Automated service completion alerts
- [ ] **SMS Integration** - Text message notifications
- [ ] **Payment Processing** - Integrated payment gateway
- [ ] **Inventory Management** - Parts and supplies tracking
- [ ] **Reporting Dashboard** - Analytics and reports
- [ ] **Mobile App** - React Native companion app
- [ ] **Multi-Language Support** - Internationalization
- [ ] **Dark Mode** - Theme toggle

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](backend/LICENSE) file for details.

---

## 👨‍💻 Authors

- **Abe Garage Development Team** - *Initial work*

---

<div align="center">

**Built with ❤️ for automotive excellence**

*Abe Garage Management System - Efficient, Reliable, Professional*

</div>
