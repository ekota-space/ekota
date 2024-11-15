import { createEffect, createSignal, For } from "solid-js";
import { useProjectList } from "~/lib/services/supabase/project/use-list";
import OrganizationSidebarItem from "../../org/sidebar-item";
import { useLocation, useParams } from "@solidjs/router";

function OrganizationNestedProjects() {
	const { slug } = useParams<{ slug: string }>();
	const projects = useProjectList();

	return (
		<div class="pl-5">
			<For each={projects.data ?? []}>
				{(project) => {
					const location = useLocation();
					const [currentPath, setCurrentPath] = createSignal(location.pathname);

					createEffect(() => {
						setCurrentPath(location.pathname);
					});

					const href = `/org/${slug}/projects/${project.slug}`;
					return (
						<OrganizationSidebarItem
							name={project.name}
							expanded={true}
							href={href}
							icon={() => <span>🦆</span>}
							isActive={currentPath().startsWith(href)}
						/>
					);
				}}
			</For>
		</div>
	);
}

export default OrganizationNestedProjects;
