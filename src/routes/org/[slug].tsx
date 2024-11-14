import type { ParentProps } from "solid-js";
import OrganizationSearchBar from "~/components/modules/org/searchbar";
import OrganizationSidebar from "~/components/modules/org/sidebar";

function OrganizationLayout(props: ParentProps) {
	return (
		<section class="flex">
			<OrganizationSidebar />
			<div class="flex flex-col w-full">
				<OrganizationSearchBar />
				{props.children}
			</div>
		</section>
	);
}

export default OrganizationLayout;
