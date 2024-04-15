import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		name: String,
		path: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("File", fileSchema);
