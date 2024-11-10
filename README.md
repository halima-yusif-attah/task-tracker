# Simple App Tracker

A simple task tracker built with React that allows users to add, edit, delete, and filter tasks based on their status (completed or pending). This application ensures persistent data, so tasks remain intact even after the page reloads.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Implementation Notes](#implementation-notes)
- [License](#license)

## Overview

The **Simple App Tracker** is a task management app where users can:
- **Create a new task** via a form.
- **Edit** or **delete** existing tasks.
- **Filter tasks** by their status (completed or pending).
- **Persistent data** after a page reload, thanks to browser local storage.

## Features

- **Create a Task**: A form allows users to enter task details and save them.
- **Edit a Task**: Users can modify the title or status of existing tasks.
- **Delete a Task**: Tasks can be removed from the list.
- **Filter Tasks**: Users can filter tasks based on their status (completed or pending).
- **Persistent Data**: The app uses the browser's local storage to save tasks, ensuring the data persists even when the page is reloaded.

## Technologies Used

- **React**: The front-end library used to build the user interface.
- **React Hooks**: For managing state (e.g., `useState`, `useEffect`) and handling form submission, task updates, and local storage management.
- **Local Storage**: Data persistence between page reloads is achieved through the browser's local storage.
- **CSS**: Basic styling is used to create a simple and user-friendly interface.
- **Webpack**: Used as the bundler for this React app.

## Installation

To run the app locally, follow these steps:

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/simple-app-tracker.git

1. Clone the repository
Clone this repository to your local machine using the following command:

bash
Copy code
git clone https://github.com/your-username/simple-app-tracker.git

2. Install dependencies
Navigate to the project folder and install the required dependencies using npm or yarn.

bash
Copy code
cd simple-app-tracker
npm install
Or, if you use yarn:

bash
Copy code
cd simple-app-tracker
yarn install

3. Start the development server
Run the app in development mode:

bash
Copy code
npm start
Or, using yarn:

bash
Copy code
yarn start
This will start the development server and open the app in your browser at http://localhost:3000.

Running the App
Once the server is running, the app should automatically open in your default browser. If it doesn't, navigate to http://localhost:3000 to see the app.

App Features
Create a Task: Fill out the form with a task title and status (Pending or Completed), and click "Add Task".
Edit a Task: Click the "Edit" button next to any task to modify its title or status.
Delete a Task: Click the "Delete" button to remove a task from the list.
Filter Tasks: Use the "Show Completed" and "Show Pending" buttons to filter tasks based on their status.
Data Persistence: Tasks are saved to local storage and will remain even after the page reloads.
Implementation Notes
Local Storage for Persistence:
To ensure that data persists after the page reloads, I used the browser's local storage. When a task is added, edited, or deleted, the tasks are stored in the localStorage API under a key called "tasks". On app load, the tasks are fetched from localStorage and rendered on the page.


Additional Notes:
The app has been kept simple to ensure it demonstrates core React concepts, including state management, form handling, and local storage for persistence.
This README provides the basic functionality and setup instructions, but you can extend this app by adding more features like due dates, priority levels, or sorting.
