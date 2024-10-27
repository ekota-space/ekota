import { redirect } from "next/navigation";
import OrganizationList from "./modules/root/OrganizationList";
import { Card } from "flowbite-react";
import { FaBuilding } from "react-icons/fa6";
import RootNavbar from "./modules/root/RootNavigation";
import { apiService } from "@/services/api/api";

export default async function Home() {
	const orgs = await apiService.organizations
		.organizationsList()
		.then((res) => res.data.data)
		.catch(() => []);

	if (orgs?.length === 0) {
		redirect("/organizations/create");
	}

	return (
		<main>
			<RootNavbar />
			<Card className="mx-auto max-w-md mt-5">
				<div className="flex gap-2 items-center text-xl">
					<FaBuilding />
					<h2>Your Organizations</h2>
				</div>
				<OrganizationList />
			</Card>
		</main>
	);
}
