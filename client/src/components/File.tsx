import { Button, Card } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { AiFillFile } from "react-icons/ai";

import axios from "axios";

const File = ({ id, name }: { id: string; name: string }) => {
	const handleClick = () => {
		window.open(
			`${import.meta.env.VITE_API_BASE_URL}/files/${id}`,
			"_blank"
		);
	};

    const downloadFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
		const res = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/files/${id}`,
			{
				responseType: "blob",
			}
        );
        
		const url = window.URL.createObjectURL(
			new Blob([res.data], { type: "application/pdf" })
		);
		const link = document.createElement("a");
		link.href = url;
		link.download = name;
		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	};

	return (
		<Card
			onClick={handleClick}
			className="p-1 h-max bg-slate-100 bg-opacity-50 rounded-lg cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out"
		>
			<div className="flex gap-2 mb-4">
				<AiFillFile
					fill="#ffe99f"
					size={24}
					strokeWidth={2}
					stroke="black"
				/>
				<p>{name}</p>
			</div>
			<Button
				type="primary"
				onClick={downloadFile}
				icon={<DownloadOutlined />}
			>
				Download
			</Button>
		</Card>
	);
};
export default File;
