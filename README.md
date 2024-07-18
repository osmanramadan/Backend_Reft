

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

 # Authentication 

## Main Endpoint: `/api/v1/users`

### **Endpoints**

#### main endpoint:/api/v1/users

- **POST `/signup`**
  - Create a new user account.
       - **required inputs**:
         ```bash
          {
         "email": "",
         "username":"",
         "password":"",
         "phone":"",
         "city":"",
         "role":""
         }
- **POST `/login`**
  - Authenticate user credentials.
      - **required inputs**:
        ```bash
         {
          email="",
          password=""
        }
- **POST `/forgotPassword`**
  - forgot password endpoint to renew password.
      - **required inputs**:
        ```bash
        {
          email=""
        }
        
- **POST `/verifyResetCode`**
  - verify reset code to renew password.
      - **required inputs**:
        ```bash
         {
          email="",
          resetCode=""
        }
        
- **POST `/resetPassword`**
  - reset password and setting new password
      - **required inputs**:
        ```bash
         {
           email="",
           newpassword=""
        }

        
- **GET `/verifyuser`**
  - Get user info by token and check if JWT period is expired or not (used in frontend to identify the period should user spend in system to login again)
      - **required inputs** :
        ```bash
         userid _Coming from token after parsing_
    
***THE REST ENDPOINTS ARE UNUSED***


 # Halls

## Main Endpoint: `/api/v1/halls`

### **Endpoints**



- **GET `/`**
  - Get all halls.
    
- **GET `/cities`**
  - Retrieve all cities.
    
- **GET `/getadminhalls`**
  - Retrieve all halls which are unchecked to make admin cofirm it.
    
- **GET `/:id`**
  - Retrieve all halls of specific user.
    
- **GET `/video/:filename`**
  - Retrieve video by its name.
    
- **GET `/pdf/:filename`**
  - Retrieve pdf by its name.
 
- **POST `/addhall`**
  - Add new hall by owner
     - **required inputs**:
       ```bash
        {
        name="",
        capacity="",
        city="",
        price="",
        location="",
        details="",
        images=[],
        imageCover="",
        pdf="",
        video="",
        user_id=""
      };

- **POST `/delete/:id`**
  - Delete hall by its paramter id.

- **POST `/addrate`**
  - Add rate to specific hall
     - **required inputs**:
       ```bash
        {
          hallid="",
          userid="",
          rate=""
        };

- **POST `/hallcodes`**
  - get the codes of hall
     - **required inputs**:
       ```bash
         {
          id=""
         };


- **POST `/showrate`**
  - show rate of specific hall
     - **required inputs**:
       ```bash
       {
          hallid="",
          userid=""
       };

- **PUT `/`**
  - Update status of specific hall (only for admin)
     - **required inputs**:
       ```bash
       {
          checked="",
          id=""
       }; 

 # Messages

## Main Endpoint: `/api/v1/messages`

### **Endpoints**

- **GET `/`**
  - Get all messages (only for admin)
     - **required inputs**:
        ```bash
        {
          checked="",
          id=""
        }; 
- **POST `/`**
  - Add new messages 
     - **required inputs**:
       ```bash
       {
        name="",
        phone="",
        email="",
        message="",
        user_id=""
      }; 
- **DELETE `/delete/:id`**
  - Delete messages (only for admin)
 
 # Checkout

## Main Endpoint: `/api/v1/checkout`

### **Endpoints**

#### **1. Create Order with PayPal**

- **POST** `/createorderpaypal`
  - **Description**: Create a new order using the PayPal gateway.
  - **Required Inputs**: 
    - ```bash
      {
       amount:''
      }

#### **2. Create Order with Stripe**

- **POST** `/createorderstripe`
  - **Description**: Create a new order using the Stripe gateway.
  - **Required Inputs**: 
    - ```bash
      {
       amount:''
      }
      
#### **3. Capture Payment with PayPal**

- **POST** `/capturepaymentpaypal?token=?`
  - **Description**: Capture the order using the PayPal gateway. After the token is validated, insert book info into the database.
  - **Request Format**:
    - The request contains two arrays: one for `dashboard` and another for `booktable`.

    - **For type `onehour`**:
      - **Dashboard Info**:
        ```json
        {
          "userid": "",
          "halluserid": "",
          "hallid": "",
          "date": "",
          "hour": "",
          "type": "",
          "amount": "",
          "secretcode": "generateNumericSecretCode()"
        }
        ```

      - **Book Table Data**:
        ```json
        {
          "type": "",
          "userid": "",
          "hallid": "",
          "date": "",
          "day": "",
          "hour": "",
          "year": "",
          "month": "",
          "code": "${hallid}${year}${month}${day}${hour}"
        }
        ```
    - **For type `hourdays`**:
      - **Dashboard Info**:
        ```json
        {
            userid="",
            halluserid="",
            hallid="",
            datefrom="",
            dateto="",
            hour="",
            type="",
            amount="",
            secretcode: generateNumericSecretCode()
        }
        ```

      - **Book Table Data - loop for bookinfo and get the next data-**:
        ```json
        {
             userid,
             hallid,
             date,
             day,
             hour,
             year,
             month,
            code
        }
        ```
    - **For type `dayshours`**:
      - **Dashboard Info**:
        ```json
        {
            userid,
            halluserid,
            hallid,
            datefrom,
            dateto,
            hourfrom,
            hourto,
            type,
            amount,
            secretcode: generateNumericSecretCode()
        }
        ```

      - **Book Table Data - loop for bookinfo and get the next data-**:
        ```json
        {
             userid,
             hallid,
             date,
             day,
             hour,
             year,
             month,
            code
        }
        
   - **For type `dayhours`**:
      - **Dashboard Info**:
        ```json
        {
            userid,
            halluserid,
            hallid,
            date,
            hourfrom,
            hourto,
            type,
            amount,
            secretcode: generateNumericSecretCode()
        }
        ```

      - **Book Table Data - loop for bookinfo and get the next data-**:
        ```json
        {
             userid,
             hallid,
             date,
             day,
             hour,
             year,
             month,
            code
        }

    - **Complete Request Format for onehour**:
        ```json
        {
          "amount": "",
          "data": {
            "dashboardinfo": {
              // Dashboard info here
            },
            // Other data here
          }
        }
        ```
        
     - **Complete Request Format for other types**:
        ```json
        {
          "amount": "",
          "data": {
            "type":"",
            "dashboardinfo": {
              // Dashboard info here
            },
            "bookinfo":{
            // Book info here
          }
        }
        ```
#### **4. Capture Payment with Stripe**
 - **POST** `/capturepaymentstripe?sessionid=?`
   - **Description** capture the order using stripe gateway
     - After the process of _sessionid validation_ success insert book info into database **same as paypal**

     
 # Booking Info 

## Main Endpoint: `/api/v1/booking`

### **Endpoints**

- **GET** `/`
  - **Description**: Get booking info of two side(owner,teacher) *only for admin*.
    
- **GET** `/teacherbooking/:id`
  - **Description**: Get booking info of teacher

- **GET** `/ownerbooking/:id`
  - **Description**: Get booking info of owner 


 
    
    




---

# Authentication and Authorization

- Authentication is required for most routes using JWT tokens (`verify` middleware).


---

# Installation

1. **Clone the repository**:
  
   git clone
   

2. **Configure environment variables**:
   - Setting up `.env` 

3. **Install dependencies**:
   - Install backend dependencies:
   
     ```bash
        npm install
    
   - Run the development server:
    ```bash          
       npm run start
    



## Contact

For questions or feedback,, contact Me at [osmanramadan840@gmail.com](mailto:osmanramadan840@gmail.com) 
