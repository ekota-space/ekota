import { authOptions } from "@/collections/auth";
import { getServerSession } from "next-auth";
import LoginButton from "./modules/root/LoginButton";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return <main>{session ? <p>Authenticated</p> : <LoginButton />}</main>;
}
