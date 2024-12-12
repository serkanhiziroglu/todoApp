# Todo App Backend

A RESTful API for a Todo List application built with Express.js, TypeScript, and Prisma.

## Prerequisites
- Node.js (v18+ recommended) 
- MySQL installed and running locally
- npm or yarn

## Setup Instructions

1. **Ensure MySQL is Running Locally**
   ```bash
   # On Windows, check Services app for MySQL
   # On Mac with Homebrew:
   brew services start mysql
   # On Linux:
   sudo service mysql start

2. **Clone the Repository**
    ```bash
    git clone https://github.com/serkanhiziroglu/todoApp
    cd todo-backend
    
3. **Install Dependencies**
    ```bash
    npm install
    
4. **Set Up Environment Variables**
    Create a .env file in the root directory and add the following:
    ```bash
    DATABASE_URL="mysql://root@localhost:3306/todo_db"
    PORT=3001
    
    
5. **Set up the database**
    ```bash
    # Access MySQL and create database
    mysql -u root
    CREATE DATABASE todo_db;
    exit
    
    # Run Prisma migrations
    npx prisma generate
    npx prisma migrate dev
    
6. **Start the Development Server**
    ```bash
    npm run dev

