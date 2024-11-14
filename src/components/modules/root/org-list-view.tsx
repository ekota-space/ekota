import { useNavigate } from "@solidjs/router";
import { createEffect, For } from "solid-js";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { useOrgList } from "~/lib/services/supabase/org/use-list";
import { useProfileGet } from "~/lib/services/supabase/profile/use-get";

const OrgListView = () => {
	const orgs = useOrgList();
	const navigate = useNavigate();
	useProfileGet();

	createEffect(() => {
		if (!orgs.isLoading && orgs.data && orgs.data.length === 0) {
			navigate("/org/create");
		}
	});

	return (
		<div class="min-w-80">
			<For each={orgs.data}>
				{(org) => (
					<a
						class="flex items-center gap-3 w-full transition-all hover:bg-foreground/10 active:bg-foreground/20 cursor-pointer rounded p-2 text-foreground"
						href={`/org/${org.slug}`}
					>
						<Avatar>
							<AvatarFallback>
								{org.name.slice(0, 1).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<h4 class="text-xl">{org.name}</h4>
							<p class="text-sm">{org.description}</p>
						</div>
					</a>
				)}
			</For>
		</div>
	);
};

export default OrgListView;
