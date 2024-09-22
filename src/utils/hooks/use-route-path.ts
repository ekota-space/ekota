import { useParams, usePathname } from "next/navigation";

export default function useRoutePath(): string {
	const params = useParams();
	const fullPathname = usePathname();
	const reversedParams = Object.fromEntries(
		Object.entries(params).map(([key, value]) => [value, key]),
	);
	return (
		`/${fullPathname
			.split("/")
			.filter((path) => path !== "")
			.map((path) => {
				if (path in reversedParams) {
					return `[${reversedParams[path]}]`;
				}

				return path;
			})
			.join("/")}`
	);
}
