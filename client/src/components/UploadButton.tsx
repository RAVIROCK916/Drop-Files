import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { UploadProps } from "antd";
import axios from "axios";

const UploadButton = ({ setFiles, allowedTypes }: { setFiles: any, allowedTypes: string[] }) => {
	const [fileList, setFileList] = useState<any[]>([]);
	const [uploading, setUploading] = useState(false);

	const uploadFile = (file: any) => {
		const formData = new FormData();
		const url = "http://localhost:3000/file/upload";
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		formData.append("file", file);
		formData.append("fileName", file.name);
		axios
			.post(url, formData, config)
			.then((res) => {
				setFiles((prev: any) => [
					...prev,
					{
						id: res.data.id,
						name: res.data.name,
						mimetype: fileList[0].type,
					},
				]);
				console.log(fileList);

				setFileList([]);
				message.success("upload successfully.");
			})
			.catch(() => {
				message.error("upload failed.");
			})
			.finally(() => {});
	};

	const handleUpload = () => {
		try {
			setUploading(true);
			fileList.map((file) => {
				uploadFile(file);
			});
		} catch (error) {
			message.error("Failed to upload file");
		} finally {
			setUploading(false);
		}
	};

	const props: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			
			if (!allowedTypes.includes(file.type)) {
				message.error(`${file.name} is not a supported`);
			} else {
				setFileList([...fileList, file]);
			}
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
