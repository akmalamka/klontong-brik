# 📦 Klontong Project: Product Management Dashboard

This project serves as a modern Single Page Application (SPA) built with Vue 3, Pinia, Firebase and Radix Vue, developed as a **Frontend Technical Test for BRIK**.

The application simulates a simple product management system ("Klontong" is an Indonesian term for a small convenience or general store) with CRUD operations and Firebase Authentication.

***

## 🛠️ Tech Stack Highlights

* **Frontend:** Vue 3 (Composition API & `<script setup>`)
* **State Management:** Pinia
* **Styling:** Tailwind CSS / PostCSS
* **UI Components:** Radix Vue, Tanstack Vue Table and Vaul-Vue
* **Authentication & Mock Backend:** Firebase Authentication & Emulators (Local)
* **Mock API:** `crudcrud.com`

***

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

You must have **Node.js** and **pnpm** installed globally.

### Step 1: Clone and Configure Environment

1.  Clone the repository and switch to the `main` branch:

    ```bash
    git clone https://github.com/akmalamka/klontong-brik
    cd klontong-project
    git switch main
    ```

2.  Create a file named **`.env`** in the root directory and populate it with your Firebase application credentials. This is essential for the Firebase SDK to initialize.

    #### **`.env` Template**

    ```env
    # --- Firebase App Configuration ---
    VITE_FIREBASE_API_KEY=AIzaSyAKW7biSbgvzRrErwKi9LwRWbI2uR0Am9s
    VITE_FIREBASE_AUTH_DOMAIN=klontong-brik.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=klontong-brik
    VITE_FIREBASE_STORAGE_BUCKET=klontong-brik.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=825386953497
    VITE_FIREBASE_APP_ID=1:825386953497:web:ef910f33504f35d92ef388
    FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099

    # NOTE: The public crudcrud API URL is hardcoded in the API service files.
    ```

### Step 2: Install Dependencies

Use pnpm to install all required packages:

```bash
pnpm i
```

### Step 3: Run the Services (2 Terminals Required)

You need **two separate terminals** running concurrently to serve the Vue application and the local Firebase authentication service.

| Terminal | Command | Purpose |
| :--- | :--- | :--- |
| **Terminal 1 (App)** | `pnpm dev` | Starts the Vue development server. |
| **Terminal 2 (Auth)** | `pnpm firebase:emulators` | Starts the local Firebase Auth emulator service. |

### Step 4: Access the Application

Once both commands are running:

1.  Open your browser and navigate to the application: **`http://localhost:5173/`**
2.  The application is ready for testing!

***

## 👨‍💻 Testing Flows

### 1. Test CRUD Functionality (Manage Products)

This uses the pre-configured mock API data.

1.  Go to the **Login Page** at `http://localhost:5173/login`.
2.  Log in using the default user credentials:
    * **Email:** `akmal@gmail.com`
    * **Password:** `12345qwerty`
3.  You will be automatically redirected to the **Manage Page**. (If you didn't get directed to home page / kicked back to login page, please verify the email by using the no 2 (Testing the Full Authentication Cycle in step 3), probably the email has not been verified yet :( ))
4.  Test the following actions:
    * **View** (click on a product row)
    * **Create** (click the Add button)
    * **Edit** (open the product view and click Edit)
    * **Delete** (via the Delete button in the view drawer)
5.  Test the **Logout** button.

### 2. Testing the Full Authentication Cycle

This verifies the frontend's ability to handle new user registration and email verification status.

1.  Go to the **Register Page** at `http://localhost:5173/register`.
2.  Enter any email and a strong password.
3.  **Simulate Email Verification:** Since Firebase Emulators do not send emails, you must manually verify the account:
    * Open the **Firebase Emulator UI** at **`http://127.0.0.1:4000/auth`**.
    * Find the new user you just created in the user list.
    * Click the **three dots** menu next to the user and select **Edit User**.
    * Toggle the **"Verified email"** field to **True** and click **Save**.
4.  Go to the **Login Page** at `http://localhost:5173/login`.
5.  Log in with your newly registered and verified email/password.
6.  The verified user will gain access to the **Manage Page**.

***
## ⚠️ Important API Notice (CRUDCRUD Expiration)

The mock backend uses **`crudcrud.com`**, which provides temporary endpoints that usually expire after about **10 days**.

If you run the application and the product list remains empty, or if API actions consistently fail with a **404 Not Found** error, it means the endpoint has expired. Please let me know so that I can extend the api, thanks!

## ⚠️ Important Notes

* **Data Consistency:** Since the products data is hosted on an **unprotected mock API** (`crudcrud.com`), all logged-in users always view and interact with the **same set of products**.
* **Frontend Guard:** The frontend ensures that only a **logged-in user** can access the `/manage` route. If the user is not authenticated via Firebase, they are redirected to the login page.
