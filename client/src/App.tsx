import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [file, setFile] = useState<any>(null);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const url = "http://localhost:3000/" + "file/upload";
		const formData = new FormData();
		formData.append("file", file);
		formData.append("fileName", file.name);
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios.post(url, formData, config).then((response: any) => {
			console.log(response.data);
		});
	}

	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<form onSubmit={handleSubmit}>
				<input
					type="file"
					name="file"
					id=""
					onChange={(event: any) => {
						setFile(event.target.files[0]);
					}}
				/>
				<button
					type="submit"
					className="px-5 py-2 border border-zinc-900"
				>
					Submit
				</button>
			</form>
		</main>
	);
}

export default App;
