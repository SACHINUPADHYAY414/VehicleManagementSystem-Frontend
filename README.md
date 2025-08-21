# ✈️ VehicleHub - City to City Bus Booking System

A** full-stack** ** web application** built with **React**, **Redux**, **Node.js**, **Express**, and **PostgreSQL** that allows users to register, log in, and book seats for city-to-city bus journeys.

## 🚀 Features

🔐 User Authentication – Login and register with secure credentials (JWT & bcrypt)
🚌 City-to-City Bus Search – Easily browse available buses between cities
🎟️ Seat Booking System – Select and book available seats in real-time
🔍 Filter Functionality – Filter buses by city, time, availability, and more
📦 State Management – Managed using Redux and Redux Toolkit
💬 Chatbot Support – In-app chatbot to assist users with bookings, routes, and FAQs
👤 Profile Settings – Users can update their profile information and manage account settings
🔑 Forgot Password – Secure password reset functionality via email verification
🚌 Admin Controls – Add and manage buses, seats, cities, states, and countries from backend APIs
🌐 RESTful API – Node.js & Express backend with organized routes and controllers
🗄️ PostgreSQL Database – Stores users, buses, bookings, seats, and geographical data
🛡️ CORS-Enabled Backend – Cross-origin requests supported for frontend-backend integration
⚡ Fast Refresh & HMR – Powered by Vite for instant feedback during development


💬 **Chatbot Support**

Our built-in chatbot enhances the user experience by providing:
🧭 **Guided Search** – Helps users search for cities and available buses
❓ **FAQs** – Answers common queries about seat booking, cancellations, and more
📅 **Smart Suggestions** – Offers alternative travel dates and routes
🔄 **Live Interaction** – Responds to user queries in real-time via the frontend UI

The chatbot can be powered using rule-based logic, or integrated with NLP models like GPT-based APIs.

## 🛠️ Tech Stack

| Frontend       | Backend       | Database       | Tools & Libraries         |
|----------------|---------------|----------------|---------------------------|
| React + Vite   | Node.js       | PostgreSQL     | Redux, Axios, Express     |
| Redux Toolkit  | Express.js    | pg (node-postgres) | CORS, dotenv, bcrypt     |

---

## 📁 Project Structure

---
## 🧪 Getting Started
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/VehicleHub.git
cd VehicleHub
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/VehicleHub
JWT_SECRET=your_jwt_secret
# For backend
cd server
npm install

# For frontend
cd ../client
npm install
🔐 Authentication
Passwords are hashed using bcrypt

JWT-based authentication

🧾 ESLint Configuration
If you're using @vitejs/plugin-react, you can extend ESLint configuration for better code quality.
To enable type-aware linting, consider switching to TypeScript template.

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

📄 License
This project is licensed under the MIT License.


