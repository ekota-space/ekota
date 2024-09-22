import Link from "next/link";

interface Props {
	icon: React.ReactNode;
	title: React.ReactNode;
	active?: boolean;
	href: Parameters<typeof Link>["0"]["href"];
}

export default function BottomNavigationItem({
	icon,
	title,
	active = false,
	href,
}: Props) {
	return (
		<Link
			href={href}
			className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
		>
			<span className={`${active ? "text-cyan-500" : ""} text-xl`}>{icon}</span>
			<span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
				{title}
			</span>
		</Link>
	);
}
