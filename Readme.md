# Full-Stack Application with Vite and Node.js

This project is a full-stack web application consisting of a front-end built with Vite and a back-end powered by Node.js. The application is structured into two main folders: `client` for the front-end and `server` for the back-end.

## Project Structure

- **client**: Contains the front-end code built with Vite.
- **server**: Contains the back-end code built with Node.js.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (v6.x or higher)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/iamBhanuRathore/zucol-interview.git
   cd zucol-interview
   ```

2. **Install client dependencies**:

   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**:
   ```bash
   cd ../server
   npm install
   ```

## Running the Application

### Start the Vite Front-End Server

1. **Navigate to the client folder**:

   ```bash
   cd client
   ```

2. **Start the Vite development server**:

   ```bash
   npm run dev
   ```

   The Vite server will start on [http://localhost:5173](http://localhost:5173).

### Start the Node.js Back-End Server

1. **Navigate to the server folder**:

   ```bash
   cd server
   ```

2. **Start the Node.js development server**:

   ```bash
   npm run dev
   ```

   The Node.js server will start on [http://localhost:3000](http://localhost:3000).

## Available Scripts

### Client

- **`npm run dev`**: Starts the Vite development server.
- **`npm run build`**: Builds the production-ready front-end.

### Server

- **`npm run dev`**: Starts the Node.js development server using `nodemon`.
- **`npm start`**: Starts the Node.js server in production mode.

## Folder Structure

```plaintext
full-stack-app/
├── client/   # Vite front-end code
│   ├── public/
│   ├── src/
│   └── vite.config.js
├── server/   # Node.js back-end code
│   └── server.js
└── README.md
```
