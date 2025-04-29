# Inventory Management System

## 📖 Overview
The **Inventory Management System** is a comprehensive solution for tracking and managing product stock, expenses, and user operations. This project includes CRUD functionality for products and features an intuitive dashboard to streamline inventory management processes. It is designed to enhance productivity and ensure efficient inventory control.

---

## ✨ Key Features

### 1. **Dashboard**
   - Provides an overview of key metrics such as total products, stock levels, and expenses.
   - Visual representation of data through charts and graphs.

### 2. **Product Management (CRUD)**
   - Add, edit, delete, and view product details.
   - Track stock levels in real-time.
   - Categorize products for easy organization.

### 3. **Expenses Tracking**
   - Record and monitor business expenses.
   - Generate detailed expense reports.

### 4. **Inventory Management**
   - View all inventory items with their stock levels.
   - Update stock quantities as needed.
   - Prevent overstocking or stock shortages.

### 5. **User Management**
   - Manage user roles (e.g., Admin, Staff).
   - Secure login system to ensure data integrity.

---

## 🛠️ Technologies Used

| Component       | Technology                     |
|------------------|--------------------------------|
| **Frontend**     | React.ts                       |
| **Backend**      | Node.js + Express.js          |
| **Database**     | MongoDB                       |
| **Styling**      | Tailwind CSS                 |

---

## 📂 Database Schema

| Table Name      | Description                                           |
|------------------|-------------------------------------------------------|
| `Users`         | Stores user information (id, name, role, password).   |
| `Products`      | Tracks product details (id, name, category, stock).   |
| `Expenses`      | Records business expenses (id, amount, description).  |
| `Transactions`  | Logs sales and purchases with timestamps.             |

---

##▶️ Demo vedio 

Here 🔗 : https://drive.google.com/file/d/1aTWS0RMvFS3D3aeDII4ssVwQWce18a8n/view?usp=drivesdk

##🚀 Installation & Setup

1. Clone the Repository

git clone https://github.com/yourusername/inventory-management-system.git
cd inventory-management-system

2. Install Dependencies

Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

3. Configure Environment Variables
Create a .env file in both backend and frontend directories.

Set up variables such as database URI and API endpoints as needed.

4. Run the Application

Start Backend

cd backend
npm run dev

Start Frontend

cd ../frontend
npm start

5. Access the Application
Open your browser and navigate to: http://localhost:3000