# Cleaning Service - Admin Frontend

Live Admin Dashboard: [https://admin-gocleanix.netlify.app/admin](https://admin-gocleanix.netlify.app/admin)

This is the **admin frontend** of the Cleaning Service Website, designed for managing services, orders, customers, and reviews. Admins and moderators can oversee service bookings and customer interactions efficiently.

## Features

- **Admin & Moderator Roles:**
  - **Admin:** Full control, including user management (add/remove users).
  - **Moderator:** Can manage orders, services, showcases, and reviews but cannot add/remove users.
- **Secure Authentication:**
  - Login via **Email & Password** or **Google Authentication** (Firebase + React Firebase Hooks).
- **Data Visualization:**
  - Nivo charts (`@nivo/bar`, `@nivo/line`, `@nivo/pie`) for statistics.
- **Form Handling:**
  - **React Hook Form** for user-friendly data entry.
- **Order & Service Management:**
  - Update orders, add showcase projects with images, and manage customer interactions.
- **Notifications:**
  - Real-time updates with **React Toastify**.

## Tech Stack

- **Frontend Framework:** React.js
- **State Management:** React Hooks
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form
- **Authentication:** Firebase (Google login), JWT (Email & Password login)
- **Data Visualization:** Nivo Charts
- **UI Components:** React Icons
- **Notifications:** React Toastify
- **Date Handling:** Day.js

## Pages & Functionalities

- **Dashboard:** Overview of orders, services, and reviews.
- **Manage Users:** Add/remove users (admin only).
- **Orders:** View and update customer orders.
- **Services:** Manage available cleaning services.
- **Showcases:** Add and display past service projects with images.
- **Reviews:** Moderate customer feedback.

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/muh-arifulislam/f-cleaning-service-admin
   cd f-cleaning-service-admin
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up Firebase authentication and get the configuration.
   Create a `.env` file and add the following:

   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the application:
   ```sh
   npm run start
   ```

## API Integration

This frontend communicates with the backend server hosted at:
[https://cleaning-service-server-one.vercel.app/](https://cleaning-service-server-one.vercel.app/)

Backend project: [https://github.com/muh-arifulislam/f-cleaning-service-server](https://github.com/muh-arifulislam/f-cleaning-service-server)

## License

This project is licensed under the MIT License.
