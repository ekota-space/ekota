import type { ParentProps } from "solid-js";
import OrganizationSidebar from "~/components/modules/org/sidebar";

function OrganizationLayout(props: ParentProps) {
	return (
		<section class="flex">
			<OrganizationSidebar />
			{props.children}
		</section>
	);
}

export default OrganizationLayout;
