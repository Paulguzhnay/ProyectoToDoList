# 💻 To-Do List App 💻

## 📚 Description 📚
The To-Do List App is a simple and intuitive task management tool designed to help you organize your daily activities and stay productive. With this app, you can easily create, manage, and track tasks to ensure nothing falls through the cracks.

## 🚀 Features 🚀

### CRUD Features

- **Create Tasks:**
  - Add new tasks with a title and description.
  - Optionally include additional details like due date, priority, and tags.

- **Read Tasks:**
  - View a list of all your tasks.
  - Filter tasks by status (e.g., completed, pending) or other criteria (e.g., priority, due date).
  - Search for specific tasks by title or keywords.

- **Update Tasks:**
  - Edit existing tasks to change the title, description, due date, or other details.
  - Mark tasks as completed or update their status.
  - Reassign tasks to different categories or priorities.

- **Delete Tasks:**
  - Remove tasks that are no longer needed.
  - Option to delete single tasks or multiple tasks at once.

### Login Features

- **User Registration:**
  - Create a new account with a username, email, and password.
  - Option to register using social accounts like Google or Facebook.

- **User Login:**
  - Secure login using email and password.
  - Option to log in via social accounts for quick access.

- **Password Management:**
  - Reset forgotten passwords via email.
  - Change passwords from within the app.

- **Session Management:**
  - Keep users logged in with persistent sessions.
  - Log out securely from any device.

## 📦 Installation 📦

To get started with the To-Do List App, follow these steps:

1. **Install Dependencies**:
   Ensure you have Node.js installed. Then, navigate to the project directory and install the necessary packages by running:

   ```bash
   npm install
   ```

2. **Set Up Docker**:
   The application uses Docker for managing its environment. To start the Docker services, run:

   ```bash
   docker-compose up -d
   ```

   This will set up and run the necessary containers in the background.

3. **Configure Environment Variables**:
   You need to create a `.env` file to configure environment variables for the application. Use the `.env.sample` file provided in the project as a reference. To do this:

   - Copy the `.env.sample` file and rename it to `.env`.
   - Modify the `.env` file according to your environment configuration needs.

   Example command to create the `.env` file:

   ```bash
   cp .env.sample .env
   ```

   Make sure to adjust the values in the `.env` file to match your setup.

4. **Start the Application**:
   With everything set up, you can now start the application. If using Docker, ensure all containers are up and running. You can access the application through the provided local URL (e.g., `http://localhost:3000`).

## 🤖 Technologies 🤖

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
