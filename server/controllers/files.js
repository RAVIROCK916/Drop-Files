import File from "../store/schema/FileSchema.js";

import fs from "fs";

import { logger } from "../index.js";

export async function getFiles(req, res) {
    let files = await File.find({}).select(["id", "name", "mimetype"]);
    files = files.map(file => {
        return {
            id: file._id,
            name: file.name,
            mimetype: file.mimetype
        }
    })
	res.json(files);
}

export async function getFile(req, res) {
	const { id } = req.params;
	try {
		const file = await File.findById(id);

		if (!file) {
			logger.error("File not found in database");
			return res.status(404).json({ msg: "File not found" });
		}

		const fileName = file.name;
		const filePath = file.path;

		// Check if the file exists
		if (!fs.existsSync(filePath)) {
			logger.error("File does not exist in filesystem");
			return res.status(404).json({ msg: "File not found" });
		}

		res.setHeader("Content-Type", file.mimetype);
		res.setHeader("Content-Disposition", "inline; filename=" + fileName);

		// Read the file content and send it as a response
		fs.readFile(filePath, (err, data) => {
			if (err) {
                logger.error("Error reading file", err);
				return res.status(500).json({msg: "Sry, Something went wrong"});
			}
            logger.info("File sent successfully");
			return res.send(data);
		});
	} catch (err) {
        logger.error("Unknown error", err);
		res.status(500).json({ msg: "I'm sorry, something went wrong" });
	}
}

export async function uploadFile(req, res) {
	const uploadedFile = req.file;
	const name = uploadedFile.originalname;
	if (!uploadedFile) {
		return res.status(400).json({msg: "No file uploaded."});
	}

	const createdFile = await File.create({
		_id: crypto.randomUUID(),
		name,
		path: "uploads/" + uploadedFile.filename,
		mimetype: uploadedFile.mimetype,
	});

	res.json({ id: createdFile._id, name }).status(201);
}
