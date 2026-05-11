#  Snitch Backend API

A scalable **Node.js + Express + MongoDB** backend API that supports authentication, product management with variants, and multi-currency pricing. Designed for modern e-commerce applications.

---

##  Features

###  Authentication

* JWT-based authentication
* Google OAuth login
* Secure user registration & login
* Protected routes middleware

###  Product Management

* Create products
* Add multiple product variants
* Manage variant attributes (size, color, etc.)
* Update & delete products

###  Multi-Currency Support

* Store product prices in multiple currencies
* Flexible currency handling for international users

###  User System

* Register new users
* Login with email/password
* Login with Google account
* Token-based session handling

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Google OAuth 2.0
* dotenv

---

##  Project Structure

```
project-root
│
├── controllers
├── models
├── routes
├── middleware
├── config
├── utils
├── app.js
└── server.js
```

---

##  Installation

Clone the repository:

```
git clone https://github.com/your-username/project-name.git
```

Install dependencies:

```
npm install
```

---

##  Environment Variables

Create a `.env` file in the root folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

##  Run the Server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

Server runs on:

```
http://localhost:5000
```

---

##  API Modules

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
```

### Product Routes

```
POST /api/products
GET /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Variant Routes

```
POST /api/products/:id/variants
PUT /api/variants/:id
DELETE /api/variants/:id
```

---

##  Protected Routes

Some routes require JWT token:

```
Authorization: Bearer your_token_here
```

---

## Multi-Currency Example

Example product price structure:

```
{
  "title": "T-Shirt",
  "price": {
    "USD": 20,
    "INR": 1600,
    "EUR": 18
  }
}
```

---

##  Future Improvements

* Role-based authorization (Admin/User)
* Order management system
* Payment gateway integration
* API documentation with Swagger
* Image upload support (Cloudinary / S3)

---

##  Author

Developed by **Dinesh Kumar Baghel**

If you like this project, feel free to star the repository 
