import File from "../store/schema/FileSchema.js";

import fs from "fs";

export async function getFiles(req, res) {
	const files = await File.find({});
	res.json(files);
}

export async function getFile(req, res) {
	const { id } = req.params;
	try {
		const file = await File.findById(id);

		if (!file) {
			return res.status(404).json({ msg: "File not found" });
		}

		const fileName = file.name;
		const filePath = file.path;

		res.setHeader("Content-Type", file.mimetype);
		res.setHeader("Content-Disposition", "inline; filename=" + fileName);

		// Check if the file exists
		if (!fs.existsSync(filePath)) {
			return res.status(404).send("File not found.");
		}

		// Read the file content and send it as a response
		fs.readFile(filePath, (err, data) => {
			if (err) {
				return res.status(500).send(err);
			}
            
			return res.send(data);
		});
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
}

export async function uploadFile(req, res) {
	const uploadedFile = req.file;
	const name = uploadedFile.originalname;
	if (!uploadedFile) {
		return res.status(400).send("No file uploaded.");
	}

	const createdFile = await File.create({
		_id: crypto.randomUUID(),
		name,
		path: "uploads/" + uploadedFile.filename,
		mimetype: uploadedFile.mimetype,
	});

	res.json({ id: createdFile._id, name }).status(201);
}
