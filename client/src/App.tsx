import "./App.css";
import File from "./components/File";
import { AiFillFolder } from "react-icons/ai";
import UploadButton from "./components/UploadButton";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [files, setFiles] = useState<
		{ id: string; name: string; mimetype: string }[]
	>([]);

	const allowedTypes = [
		"image/jpeg",
		"image/png",
		"application/json",
		"application/pdf",
	];

	useEffect(() => {
		fetchFiles();
	}, []);

	const fetchFiles = async () => {
		const res = await axios.get(
			import.meta.env.VITE_API_BASE_URL + "/files"
		);
		const data = await res.data;
		setFiles(data);

		return data;
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-main-background opacity-80 transition-all">
			<main className="w-[90vw] h-[90vh] overflow-auto bg-sky-100 bg-opacity-50 rounded-lg backdrop-blur-lg saturate-200 shadow-lg flex">
				<div className="p-6 border-r border-r-slate-100">
					<AiFillFolder
						size={36}
						fill="#ffe99f"
						strokeWidth={1}
						stroke="black"
					/>
				</div>
				<div className="flex flex-col gap-6 h-max p-8">
					<h1 className="text-3xl font-semibold text-zinc-900">
						Files
					</h1>
					<div className="flex flex-wrap gap-x-6 gap-y-4 h-max">
						{files.map((file) => (
							<File
								key={file.id}
								id={file.id}
								name={file.name}
								mimetype={file.mimetype}
							/>
						))}
					</div>
				</div>
				<form className="border-l border-l-slate-100 p-4 flex flex-col flex-1 justify-center items-center gap-3">
					<UploadButton
						setFiles={setFiles}
						allowedTypes={allowedTypes}
					/>
					<p className="text-sm">
						Allowed files are{" "}
						{allowedTypes
							.map((type) => "*." + type.split("/")[1])
							.join(", ")}{" "}
					</p>
				</form>
			</main>
		</div>
	);
}

export default App;
