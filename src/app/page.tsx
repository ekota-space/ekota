import { apiService } from "@/services/api/api";
import { redirect } from "next/navigation";
import LogoutButton from "./modules/root/LogoutButton";
import OrganizationList from "./modules/root/OrganizationList";
import { Card } from "flowbite-react";
import { FaBuilding } from "react-icons/fa6";

export default async function Home() {
	const orgs = await apiService.organization.list().catch(() => ({ data: [] }));

	if (orgs.data.length === 0) {
		redirect("/organizations/create");
	}

	return (
		<main>
			<LogoutButton />
			<Card className="mx-auto max-w-md">
				<div className="flex gap-2 items-center text-xl">
					<FaBuilding />
					<h2>Your Organizations</h2>
				</div>
				<OrganizationList />
			</Card>
		</main>
	);
}
