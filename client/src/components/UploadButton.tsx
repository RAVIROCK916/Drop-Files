import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { UploadProps } from "antd";
import axios from "axios";

const UploadButton = ({ setFiles }: { setFiles: any }) => {
	const [fileList, setFileList] = useState<any[]>([]);
	const [uploading, setUploading] = useState(false);

	const handleUpload = () => {
		const formData = new FormData();
		setUploading(true);

		const url = "http://localhost:3000/file/upload";

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		const file = fileList[0];
		formData.append("file", file);
		formData.append("fileName", file.name);
		axios
			.post(url, formData, config)
			.then((res) => {
                setFiles((prev: any) => [...prev, {id: res.data.id, name:res.data.name, mimetype: fileList[0].type}])
                console.log(fileList);
                
                setFileList([]);
				message.success("upload successfully.");
			})
			.catch(() => {
				message.error("upload failed.");
			})
			.finally(() => {
				setUploading(false);
			});
	};

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);

			return false;
		},
		fileList,
	};

	return (
		<>
			<Upload {...props}>
				<Button icon={<UploadOutlined />}>Select File</Button>
			</Upload>
			<Button
				type="primary"
				onClick={handleUpload}
				disabled={fileList.length === 0}
				loading={uploading}
				style={{ marginTop: 16 }}
			>
				{uploading ? "Uploading" : "Start Upload"}
			</Button>
		</>
	);
};

export default UploadButton;
