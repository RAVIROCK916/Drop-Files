import express from "express";
import { getFiles, getFile } from "./controllers/files.js";
import connectDB from "./store/connection.js";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import { transports, format } from "winston";

const app = express();
const PORT = 3000;

// dotenv configuration
dotenv.config();

// mongodb connection
connectDB();

// winston logger
app.use(
	expressWinston.logger({
		transports: [new transports.Console()],
		format: format.combine(format.json(), format.prettyPrint()),
		meta: false,
	})
);

// routes
app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/files", getFiles);

app.get("/files/:id", getFile);

app.listen(PORT, () => {
	console.log("Listening to port", PORT);
});
