# 💬 Real-Time Chat Application (MERN + Socket.IO)

A full-stack real-time chat application built using **React (Vite)**, **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO**.  
It supports authentication, real-time messaging, multiple chat rooms, online users, and typing indicators with a modern UI.

---

## 🚀 Live Features

### 🔐 Authentication System
- User Registration & Login
- JWT-based authentication
- Protected routes (frontend)
- Session stored in localStorage

### 💬 Real-Time Chat
- Instant messaging using Socket.IO
- Live message updates (no refresh needed)
- Chat history stored in MongoDB
- Auto scroll to latest messages

### 🏠 Chat Rooms
- Create new rooms dynamically
- Join and switch rooms
- Default room: **General**
- Room list sync across users

### 👥 User Presence
- Online users list
- Live typing indicator
- Real-time user updates

### 🎨 UI/UX
- WhatsApp-style chat UI
- Responsive design (mobile + desktop)
- Material UI components
- Clean sidebar + chat layout

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Material UI (MUI)
- Socket.IO Client
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT (jsonwebtoken)
- bcrypt
- cookie-parser
- cors
- dotenv

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── db/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ChatPage.jsx
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   ├── CreateRoomDialog.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   └── socket.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Run backend

```bash
npm run dev
```

Backend runs at:
```
http://localhost:3001
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

---

### Rooms

```http
POST /api/rooms/create
GET /api/rooms
```

---

## ⚡ Socket.IO Events

### Client → Server

```js
socket.emit("joinRoom", { username, room });

socket.emit("chatMessage", {
  room,
  senderName,
  text
});

socket.emit("typing", { room, username });

socket.emit("roomCreated", roomName);
```

---

### Server → Client

```js
socket.on("chatHistory", messages);
socket.on("message", message);
socket.on("onlineUsers", users);
socket.on("userTyping", data);
socket.on("newRoom", roomName);
```

---

## 🗄️ Database Models

### User
```js
{
  name: String,
  email: String,
  password: String
}
```

### Room
```js
{
  name: String
}
```

### Message
```js
{
  roomId: String,
  sender: String,
  content: String
}
```

---

## 🌐 CORS Configuration

```text
http://localhost:5173
https://real-time-chat-application-coral-chi.vercel.app
```

---

## 🔮 Future Improvements

- Private messaging
- Message read receipts
- File sharing
- Voice messages
- Dark mode
- User profiles
- Message reactions

---