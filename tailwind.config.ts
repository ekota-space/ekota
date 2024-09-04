import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  darkMode: "media",
	content: [flowbite.content(), "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
      colors: {
        gray: colors.zinc
      },
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [flowbite.plugin()],
};
export default config;
