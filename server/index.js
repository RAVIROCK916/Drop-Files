import express from "express";
import { getFiles, getFile, uploadFile } from "./controllers/files.js";
import connectDB from "./store/connection.js";
import dotenv from "dotenv";
import expressWinston from "express-winston";
import { transports, format } from "winston";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import path, { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const upload = multer({ dest: "uploads/" });

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

app.use(
	cors({
		origin: "*",
		methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
		credentials: true,
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	"/uploads",
	express.static(join(dirname(fileURLToPath(import.meta.url)), "uploads"))
);

// routes
app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/files", getFiles);

app.get("/files/:id", getFile);

app.post("/file/upload", upload.single("file"), uploadFile);

app.listen(PORT, () => {
	console.log("Listening to port", PORT);
});
