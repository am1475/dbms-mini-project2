
** Mobile Recharge System**

A mobile recharge web application built using React, Flask, MySQL, and Tailwind CSS. This application allows users to recharge mobile numbers, view recharge plans, and generate a PDF receipt with a QR code.

## Features

- Select a service provider and mobile recharge plan.
- Payment and recharge details are stored in the database.
- Generates a PDF bill with a QR code.
- Aesthetic and responsive UI with Tailwind CSS.
  
## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Generating PDF Receipt](#generating-pdf-receipt)
---

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Flask (Python), MySQL
- **API Requests:** Axios
- **Authentication:** Bcrypt
- **PDF Generation:** jsPDF, QRCode

---

## Prerequisites

Before running this project, ensure that you have the following software installed:

1. **Node.js and npm** (for running the React frontend)
2. **Python 3.x** (for the Flask backend)
3. **MySQL** (for the database)
4. **Git** (to clone the repository)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mobile-recharge-system.git
cd mobile-recharge-system
```

### 2. MySQL Database Setup

1. Ensure MySQL is running.
2. Create a new MySQL database.

```sql
CREATE DATABASE recharge_system;
```

3. Create the required tables for the recharge details:

```sql
USE recharge_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    phone_number VARCHAR(10),
    password_hash VARCHAR(255)
);

CREATE TABLE recharge_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(10),
    provider VARCHAR(50),
    plan VARCHAR(255),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Backend Setup

### 1. Create a Virtual Environment (optional but recommended)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 2. Install Flask and Dependencies

```bash
pip install flask flask-mysql-connector bcrypt
```

### 3. Configure the MySQL Connection

In the `backend/app.py` file, configure your MySQL connection settings:

```python
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_mysql_username'
app.config['MYSQL_PASSWORD'] = 'your_mysql_password'
app.config['MYSQL_DB'] = 'recharge_system'
```

### 4. Run the Flask Backend

```bash
python app.py
```

By default, Flask will run on `http://127.0.0.1:5000/`.

---

## Frontend Setup

### 1. Navigate to the Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the React Frontend

```bash
npm start
```

The frontend will run on `http://localhost:3000/`.

---

## Running the Project

To run the project, follow these steps:

1. **Start the Backend:**

   Navigate to the backend directory and run the Flask app:

   ```bash
   cd backend
   python app.py
   ```

   Flask should now be running on `http://127.0.0.1:5000`.

2. **Start the Frontend:**

   In a new terminal window, navigate to the frontend directory and run:

   ```bash
   cd frontend
   npm start
   ```

   The React app should now be running on `http://localhost:3000`.

3. **Navigate to the Recharge System:**

   Open your browser and go to `http://localhost:3000`. From here, you can input your phone number, select a service provider, and choose a recharge plan.

---

## Generating PDF Receipt

After completing the recharge process, a PDF receipt with all the transaction details and a QR code will be generated.

1. Fill out all the required information.
2. Once the recharge is successful, click the button to generate the PDF.
3. A QR code will be included in the receipt for easy reference.

Below is an example of a receipt 
![image](https://github.com/user-attachments/assets/f19a1e7f-f2c9-482e-baaf-63fdac2ab0bd)


---
