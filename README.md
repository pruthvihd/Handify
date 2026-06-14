# Handify

Handify is a full-stack web application designed to provide a seamless and secure user experience with authentication, account management, and password recovery features.

## Features

* User Registration
* User Login & Authentication
* Secure Password Storage
* Forgot Password Functionality
* OTP-Based Password Reset
* Responsive User Interface
* REST API Integration
* Secure Backend Validation

## Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Spring Boot / Node.js (update based on your project)
* REST APIs
* JWT Authentication

### Database

* MongoDB / MySQL (update based on your project)

---

## Authentication Flow

### User Registration

1. User enters registration details.
2. Backend validates the data.
3. Password is securely hashed before storage.
4. User account is created successfully.

### User Login

1. User enters email and password.
2. Credentials are validated.
3. Authentication token/session is generated.
4. User gains access to the application.

---

## Forgot Password & OTP Verification Flow

### Step 1: Forgot Password Request

* User clicks **Forgot Password** on the login page.
* Registered email address is entered.
* Backend verifies whether the account exists.

### Step 2: OTP Generation

* A secure OTP is generated.
* OTP is associated with the user's account.
* OTP is sent to the registered email address.

### Step 3: OTP Verification

* User enters the received OTP.
* Backend validates:

  * OTP correctness
  * OTP expiration time
  * Associated user account

### Step 4: Password Reset

* Upon successful verification, the user is allowed to create a new password.
* The new password is securely hashed and stored.
* OTP becomes invalid after successful reset.

### Security Measures

* Time-limited OTP validity.
* One-time OTP usage.
* Password hashing before database storage.
* Server-side validation for all requests.

---

## OTP Reset Workflow

User
↓
Forgot Password
↓
Enter Registered Email
↓
Generate OTP
↓
Send OTP via Email
↓
Enter OTP
↓
Verify OTP
↓
Reset Password
↓
Login with New Password

---

## Installation

### Clone Repository

```bash
git clone https://github.com/pruthvihd/Handify.git
cd Handify
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

(Modify commands according to your backend framework.)

---

## Future Enhancements

* Multi-factor Authentication (MFA)
* Social Login Integration
* User Activity Tracking
* Advanced Security Monitoring
* Cloud Deployment

---

## Author

Pruthvi H D

GitHub: https://github.com/pruthvihd
