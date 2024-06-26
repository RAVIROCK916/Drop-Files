# File Sharing App

This is a file sharing app that allows users to upload and download files. It consists of a React frontend and Node/Express backend.

## Frontend

The frontend is created with React and allows users to:

- Upload files
- View a list of uploaded files
- Download files

It was bootstrapped with [Vite](https://vitejs.dev/).

## Backend

The backend is a Node/Express app that handles:

- File uploads 
- Retrieving file info
- Serving files

It uses MongoDB and Mongoose for data storage.

So ensure that MongoDB is installed and running on your local machine or provide a MongoDB URI in the `.env` file in the server folder.

To run MongoDB, check that the MongoDB service is running. If not, start it with the following command:
```bash
sudo service mongod start
```

Coming to the server,

The main endpoints are:

- `GET /files` - Get list of files
- `GET /files/:id` - Get info about a file 
- `POST /file/upload` - Upload a new file

Now you can either run locally on your machine or if you have Docker installed, you can run the entire application using Docker Compose. 

Let us go through them step by step:

## Running Locally

To run the app locally:

1. Clone the repository
2. Install dependencies


cd client
npm install

1. Create a `.env` file in the server folder with your MongoDB URI
2. Run the frontend and backend


Run these commands for client side
```bash
cd client
npm i
npm run dev
```
The client will be running on `localhost:5173`

Run these commands for client side
```bash
cd server
npm i
npm run dev
```

The server will be running on `localhost:3000`

## Running using docker

- Install docker and docker compose


Now run this command in terminal
```bash
docker compose up
```

## Hosted Site
https://drop-files.vercel.app/

## Author
[Ravi Teja Pedapudi](https://github.com/RaviRock916)
