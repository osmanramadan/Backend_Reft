

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
    POSTGRES_HOST          =
    PROD_POSTGRES_HOST     =
    DEV_FRONT_LINK         =
    PROD_FRONT_LINK        =
    #Switch Between dev or prod
    NODE_ENV               =
    PORT                   =
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

**************************************************************** # Authentication 

#### main endpoint:/api/v1/users

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
        
- **POST /verifyResetCode**
  - verify reset code to renew password.
      - **required inputs** {email,resetCode}
        
- **POST /resetPassword**
  - reset password and setting new password
      - **required inputs** {email,newpassword}

        
- **GET /verifyuser**
  - Get user info by token and check if JWT period is expired or not (used in frontend to identify the period should user spend in system to login again)
      - **required inputs**  userid _Coming from token after parsing_
    
***THE REST ENDPOINTS ARE UNUSED***


**************************************************************** ### Halls

#### main endpoint:/api/v1/halls


- **GET /**
  - Get all halls.
    
- **GET /cities**
  - Retrieve all cities.
    
- **GET /getadminhalls**
  - Retrieve all halls which are unchecked to make admin cofirm it.
    
- **GET /:id**
  - Retrieve all halls of specific user.
    
- **GET /video/:filename**
  - Retrieve video by its name.
    
- **GET /pdf/:filename**
  - Retrieve pdf by its name.
 
- **POST /addhall**
  - Add new hall by owner
     - **required inputs**  {
        name,
        capacity,
        city,
        price,
        location,
        details,
        images,
        imageCover,
        pdf,
        video,
        user_id
      };

- **POST /delete/:id**
  - Delete hall by its paramter id.

- **POST /addrate**
  - Add rate to specific hall
     - **required inputs**  {
          hallid,
          userid,
          rate
      };

- **POST /hallcodes**
  - get the codes of hall
     - **required inputs**  {id};


- **POST /showrate**
  - show rate of specific hall
     - **required inputs**  {
          hallid,
          userid
      };

- **PUT /**
  - Update status of specific hall (only for admin)
     - **required inputs**  {
          checked,
          id
      }; 

**************************************************************** ### Messages

#### main endpoint:/api/v1/messages

- **GET /**
  - Get all messages (only for admin)
     - **required inputs**  {
          checked,
          id
      }; 
- **POST /**
  - Add new messages 
     - **required inputs**  {
        name,
        phone,
        email,
        message,
        user_id
      }; 
- **DELETE /delete/:id**
  - Delete messages (only for admin)
 
    
**************************************************************** ### Checkout

#### main endpoint:/api/v1/checkout

- **POST /createorderpaypal
  - Create new order using paypal gateway
     - **required inputs**  {amount}; 
    
- **POST /createorderstripe
  - Create new order using stripe gateway
     - **required inputs**  {amount};

 - **POST /capturepaymentpaypal?token=?
  - Capture the order using paypal gateway
  - After token is valid insert book info into database
      **required inputs**
      * in every req there is two array one for dashboard and another for booktable*

     - **where type _onehour_**
        data.dashboardinfo {
          userid,
          halluserid,
          hallid,
          date,
          hour,
          type,
          amount,
          secretcode:generateNumericSecretCode()
        };
        data {
          type,
          userid,
          hallid,
          date,
          day,
          hour,
          year,
          month,
          code: `${hallid}${year}${month}${day}${hour}`
        };
       * request will be in the next format :
           {
            amount='?'
            data={
               dashboardinfo:{}
            }
             ....
             ....
             ....
             ....
          }
      
    
- **POST /capturepaymentstripe?sessionid=?
  - Capture the order using stripe gateway
  - After sessionid is valid insert book info into database
     

 
    
    




---

## Authentication and Authorization

- Authentication is required for most routes using JWT tokens (`verify` middleware).


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

