import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ekota | Collaborate like you're in the same room",
	description:
		"A collaborative platform for remote teams with planning, chat, kanban, goals and more.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en">
			<body
				className={`${inter.className} dark:text-gray-100 dark:bg-zinc-900`}
			>
				{children}
			</body>
		</html>
	);
}
