import mongoose from "mongoose";
import File from "../store/schema/FileSchema.js";

export async function getFiles(req, res) {
	const files = await File.find({});
	res.json(files);
}

export async function getFile(req, res) {
	const { id } = req.params;
	console.log(typeof id);
	try {
		const file = await File.find({ id: "1" });
		console.log(file);
		if (!file) {
			return res.status(404).json({ msg: "File not found" });
		} else {
			res.json(file);
		}
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
}
