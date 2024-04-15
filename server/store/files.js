import File from "./schema/FileSchema.js";

export const getFiles = async () => {
	const files = await File.find({});
	return files;
};
