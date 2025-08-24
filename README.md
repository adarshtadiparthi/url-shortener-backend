# 🔗 URL Shortener Backend

This is the backend service for the **URL Shortener** application.  
It provides APIs to shorten long URLs, redirect short URLs to their original destinations, and manage link data.

---

## 🚀 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Nodemon** (for development)
- **JWT**

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/                     # DB connection, environment setup
|   |── middleware/                 # Middleware for authentication
│   ├── persistence/models/         # Mongoose schemas
|   ├── repository/                 # Repository layer
│   ├── routes/                     # API routes
│   ├── controllers/                # Route handlers
│   └── server.js                   # App entry point
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/url-shortener-backend.git
   cd url-shortener-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root with the following:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://your-mongo-url
   BASE_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/` | Create a shortened URL |
| GET | `/api/:shortId` | Redirect to the original long URL |
| GET | `/api/urls` | Get all stored URLs (optional) |

---

## ✅ Example Request

**POST** `/api/`

Request:
```json
{
  "originalUrl": "https://www.example.com/some/very/long/link"
}
```

Response:
```json
{
  "shortUrl": "http://localhost:5000/abc123",
}
```

---

## 🛠️ Scripts

- `npm start` → Start production server
- `npm run dev` → Start dev server with Nodemon
