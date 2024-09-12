import { apiService } from "@/services/api/api";
import { redirect } from "next/navigation";
import LogoutButton from "./modules/root/LogoutButton";

export default async function Home() {
	const { data: user } = await apiService.user.me();

	if (!user) {
		redirect("/auth/login");
	}

	const orgs = await apiService.organization.list().catch(() => ({ data: [] }));

	if (orgs.data.length === 0) {
		redirect("/organizations/create");
	}

	return (
		<main>
			{user ? (
				<>
					<LogoutButton />
				</>
			) : (
				"Not logged in"
			)}
		</main>
	);
}
