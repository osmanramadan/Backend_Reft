

# REFT (Rent Easy For Teacher) API

**API endpoints for teacher booking system**

## Overview

REFT API provides a set of endpoints to manage booking operations, checkout , messages ,halls, and user authentication. This README file outlines the available endpoints, their functionalities, and installation instructions.

---
## Required Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs

## Installation Instructions

```bash
 npm run install
```
- Setting .env
```bash
    POSTGRES_HOST          =localhost
    PROD_POSTGRES_HOST     =
    DEV_FRONT_LINK         =
    PROD_FRONT_LINK        =
    #Switch Between dev or prod
    NODE_ENV               =dev
    PORT                   =3006
    DEV_POSTGRES_DB        =
    PROD_POSTGRES_DB       =
    POSTGRES_USER          =
    POSTGRES_PASSWORD      =
    PROD_POSTGRES_PASSWORD =
    POSTGRES_PORT          =
    TOKEN_SECRET           =
    JWT_EXPIRES_IN         =
    BCRYPT_PASSWORD        =
    SALT_ROUNDS            =
    # EMAIL SETTINGS
    EMAIL_HOST             =
    EMAIL_PASSWORD         =
    EMAIL_PORT             =
    #paypal
    PAYPAL_CLIENT_ID       =
    PAYPAL_SECRET          =
    PAYPAL_HOME            =
    #stripe
    STRIPE_SECRET_KEY      =

```
## Endpoints

### Authentication
# main endpoint:/api/v1/users
- **POST /signup**
  - Create a new user account.
       - **required inputs** { email,username,password,phone,city,role}
- **POST /login**
  - Authenticate user credentials.
      - **required inputs** { email,password}
- **POST /forgotPassword**
  - forgot password endpoint to renew password.
      - **required inputs** { email}
 - **POST /forgotPassword**
  - forgot password endpoint to renew password.
      - **required inputs** { email}

### Appointments

- **GET /appointment**
  - Retrieve all appointments (Admin only).
- **POST /appointment**
  - Create a new appointment (Admin or Patient).
- **GET /appointment/:id**
  - Get details of a specific appointment (Admin or Patient).
- **PUT /appointment/:id**
  - Update a specific appointment (Admin or Patient).
- **DELETE /appointment/:id**
  - Delete a specific appointment (Admin or Patient).

### Departments

- **POST /departments**
  - Add a new department (Admin only).
- **GET /departments**
  - Retrieve all departments (Admin only).
- **GET /department/doctors/:_id**
  - Retrieve doctors in a specific department (Admin only).
- **GET /department/patients/:_id**
  - Retrieve patients in a specific department (Admin only).
- **GET /department/:_id**
  - Get details of a specific department (Admin only).
- **DELETE /department/:_id**
  - Delete a specific department (Admin only).
- **PUT /department/:_id**
  - Update a specific department (Admin only).

### Doctors

- **POST /doctors**
  - Add a new doctor (Admin only).
- **GET /doctors**
  - Retrieve all doctors (Admin only).
- **GET /doctor/:id**
  - Get details of a specific doctor (Admin or Doctor).
- **PUT /doctor/:id**
  - Update a specific doctor (Admin or Doctor).
- **DELETE /doctor/:id**
  - Delete a specific doctor (Admin or Doctor).

### Patients

- **POST /patients**
  - Add a new patient (Admin only).
- **GET /patients**
  - Retrieve all patients (Admin only).
- **GET /patient/:_id**
  - Get details of a specific patient (Admin or Patient).
- **PUT /patient/:_id**
  - Update a specific patient (Admin or Patient).
- **DELETE /patient/:_id**
  - Delete a specific patient (Admin or Patient).

### Users

- **GET /user**
  - Retrieve all users (Admin only).
- **GET /user/:_id**
  - Get details of a specific user (Admin only).

---

## Authentication and Authorization

- Authentication is required for most routes using JWT tokens (`protect` middleware).
- Different roles (admin, doctor, patient) have different levels of access (`restrictedTo` middleware).

---

## Installation

1. **Clone the repository**:
  
   git clone https://github.com/sohilaehab25/hospital_system
   cd hospital_system
 

2. **Configure environment variables**:
   - Copy `.env.example` to `.env` and update with your settings in the backend.

3. **Install dependencies**:
   - Install backend dependencies:
   
     npm install
    
   - Run the development server:
    
     nodemon app.js
    

---

## Contributing

Contributions are welcome! Follow these steps:

- Fork the repository.
- Create a new branch: `git checkout -b feature/your-feature`.
- Commit your changes: `git commit -am 'Add new feature'`.
- Push to the branch: `git push origin feature/your-feature`.
- Submit a PR (pull request).

---

## Contact

For questions or feedback, contact Sohila Ehab at [sohailaehab25@gmail.com](mailto:sohailaehab25@gmail.com) or visit [GitHub](https://github.com/sohilaehab25).

