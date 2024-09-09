import { apiService } from "@/services/api/api";
import { redirect } from "next/navigation";
import LogoutButton from "./modules/root/LogoutButton";

export default async function Home() {
	const { data: user } = await apiService.user.me();
  
	if (!user) {
		redirect("/auth/login");
	}

	return <main>{user ? <LogoutButton /> : "Not logged in"}</main>;
}
