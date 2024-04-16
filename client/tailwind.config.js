/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
            backgroundImage: {
                "main-background": "url('https://media.istockphoto.com/id/1128845361/photo/files-and-folders-network.jpg?s=612x612&w=0&k=20&c=i30ZiNepmgwpXrKkhf4g1cX2rMBaAj5NwQaseYCdbWI=')"
            }
        },
	},
	plugins: [],
};
