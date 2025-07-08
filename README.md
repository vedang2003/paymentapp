# PayTM Clone

A full-stack payment application built with the MERN stack, allowing users to sign up, sign in, view their balance, and transfer money to other users.

## Features

- **User Authentication**: Secure signup and signin with JWT tokens
- **Balance Management**: View current account balance
- **Money Transfer**: Send money to other registered users
- **User Search**: Find users by name for transfers
- **Responsive UI**: Clean, modern interface built with Tailwind CSS

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

## Project Structure

```
paytm/
├── backend/
│   ├── routes/
│   │   ├── index.js
│   │   ├── user.js
│   │   └── account.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── db.js
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Balance.jsx
    │   │   └── Users.jsx
    │   └── pages/
    │       ├── Signup.jsx
    │       ├── Signin.jsx
    │       ├── Dashboard.jsx
    │       └── SendMoney.jsx
    └── package.json
```

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paytm
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Environment Variables

Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Backendurl = ""
```

## API Endpoints

### User Routes (`/api/v1/user`)
- `POST /signup` - Register new user
- `POST /signin` - User login
- `PUT /` - Update user information
- `GET /bulk` - Search users

### Account Routes (`/api/v1/account`)
- `GET /balance` - Get user balance
- `POST /transfer` - Transfer money between accounts

## Usage

1. **Sign Up**: Create a new account with personal details
2. **Sign In**: Login with your credentials
3. **Dashboard**: View your balance and search for users
4. **Transfer Money**: Send money to other registered users