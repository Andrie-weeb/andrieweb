
Todo List Application
A simple Todo List application built with React, Node.js, and MongoDB. This project is designed to manage daily tasks efficiently, with features for adding, updating, and deleting tasks.

Features
Add Tasks: Create a new task with a title and description.
Edit/Update Tasks: Modify existing tasks with an update functionality.
Delete Tasks: Remove tasks that are no longer needed.
Error Handling: Displays error messages if a duplicate task is added or a task is deleted while in edit mode.
Tech Stack
Frontend: React (JavaScript)
Backend: Node.js, Express.js
Database: MongoDB
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v14+ recommended)
MongoDB (locally or through a cloud provider like MongoDB Atlas)
Git
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Andrie-weeb/andrieweb.git
Navigate to the project directory:

bash
Copy code
cd Todolist
Install dependencies for both frontend and backend:

For the backend:
bash
Copy code
cd todo-list-backend
npm install
For the frontend:
bash
Copy code
cd ../todo-list-frontend
npm install
Configuration
Create a .env file in the todo-list-backend directory and add your MongoDB URI and other configurations:
makefile
Copy code
MONGODB_URI=your_mongodb_uri_here
PORT=5000
Running the Application
Start the backend server:

bash
Copy code
cd todo-list-backend
npm start
Start the frontend:

bash
Copy code
cd ../todo-list-frontend
npm start
Open your browser and navigate to http://localhost:3000 to see the app.

Project Structure
bash
Copy code
Todolist
├── todo-list-backend    # Node.js + Express backend
└── todo-list-frontend   # React frontend
API Endpoints
POST /api/tasks - Add a new task
GET /api/tasks - Retrieve all tasks
PUT /api/tasks/:id - Update a specific task
DELETE /api/tasks/:id - Delete a specific task
Contributing
Feel free to open issues or submit pull requests. All contributions are welcome!

License
This project is open-source and available under the MIT License.

