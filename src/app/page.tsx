import { authOptions } from "@/collections/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return <main>Hello</main>;
}
