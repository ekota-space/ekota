import OrgListView from "~/components/modules/root/org-list-view";
import { BiSolidInstitution } from "solid-icons/bi";
import { Card } from "~/components/ui/card";

export default function Home() {
	

	return (
		<main class="flex h-screen justify-center items-center">
			<Card class="p-4 space-y-4">
				<h3 class="text-2xl">
					<span class="mr-2">
						<BiSolidInstitution class="inline-block" />
					</span>
					Organizations
				</h3>
				<OrgListView />
			</Card>
		</main>
	);
}
