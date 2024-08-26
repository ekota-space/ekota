import type { Config } from "tailwindcss";
import FlowBite from "flowbite/plugin";

const config: Config = {
	content: [
		"./node_modules/flowbite-react/dist/esm/**/*.{js,mjs}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [FlowBite],
};
export default config;
