import { Button, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import {
	AiFillFile,
	AiFillFileImage,
	AiFillFilePdf,
	AiFillFileText,
} from "react-icons/ai";

import axios from "axios";

const File = ({
	id,
	name,
	mimetype,
}: {
	id: string;
	name: string;
	mimetype: string;
}) => {
	const handleClick = () => {
		window.open(
			`${import.meta.env.VITE_API_BASE_URL}/files/${id}`,
			"_blank"
		);
	};

	const downloadFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL}/files/${id}`,
				{
					responseType: "blob",
				}
			);
			const url = window.URL.createObjectURL(
				new Blob([res.data], { type: "application/octet-stream" })
			);
			const link = document.createElement("a");
			link.href = url;
			link.download = name;
			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (err) {
			console.log(err);
		}
	};

	const renderIcon = () => {
		if (mimetype.startsWith("image/")) {
			return (
				<AiFillFileImage
					fill="green"
					size={24}
					strokeWidth={2}
					stroke="black"
				/>
			);
		} else if (mimetype.startsWith("application/pdf"))
			return (
				<AiFillFilePdf
					fill="red"
					size={24}
					strokeWidth={2}
					stroke="black"
				/>
			);
		else if (mimetype.startsWith("application/json"))
			return (
				<AiFillFile
					fill="#0077b6"
					size={24}
					strokeWidth={2}
					stroke="black"
				/>
			);
		else if (mimetype.startsWith("text/"))
			return (
				<AiFillFileText
					fill="#fffff7"
					size={24}
					strokeWidth={2}
					stroke="black"
				/>
			);
		else return <AiFillFile fill="#ffdf75" size={24} strokeWidth={2} />;
	};

	return (
		<Card
			onClick={handleClick}
			className="h-max bg-slate-100 bg-opacity-50 rounded-lg cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out"
		>
			<div className="flex gap-3 items-center">
				{renderIcon()}
				<p>{name}</p>
				<Button
					type="primary"
					onClick={downloadFile}
					icon={<DownloadOutlined />}
				></Button>
			</div>
		</Card>
	);
};
export default File;
