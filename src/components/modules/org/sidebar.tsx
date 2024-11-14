import { useLocation } from "@solidjs/router";
import clsx from "clsx";
import { BsChat, BsGrid1x2, BsSquareHalf } from "solid-icons/bs";
import { TbUsersGroup } from "solid-icons/tb";
import { createEffect, createSignal, For, Show } from "solid-js";
import { Motion } from "solid-motionone";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useOrgGet } from "~/lib/services/supabase/org/use-get";

const items = [
	{
		name: "Projects",
		path: "projects",
		icon: BsGrid1x2,
	},
	{
		name: "Teams",
		path: "teams",
		icon: TbUsersGroup,
	},
	{
		name: "Chats",
		path: "chats",
		icon: BsChat,
	},
];

function OrganizationSidebar() {
	const organization = useOrgGet();
	const [expanded, setExpanded] = createSignal(true);

	return (
		<Motion.aside
			class="flex flex-col gap-4 p-3  bg-secondary/50 h-screen"
			initial={{ width: expanded() ? "176px" : "64px" }}
			animate={{ width: expanded() ? "176px" : "64px" }}
		>
			<div class="flex justify-between">
				<div class="flex gap-2 items-center">
					<Avatar>
						<AvatarFallback>
							{organization.data?.name?.slice(0, 1)}
						</AvatarFallback>
					</Avatar>
					<Show when={expanded()}>
						<h2>{organization.data?.name}</h2>
					</Show>
				</div>
				<Show when={expanded()}>
					<Button
						title="Collapse Sidebar"
						variant="ghost"
						onClick={() => {
							setExpanded(!expanded());
						}}
					>
						<BsSquareHalf />
					</Button>
				</Show>
			</div>

			<Show when={!expanded()}>
				<Button
					title="Expand Sidebar"
					variant="ghost"
					onClick={() => {
						setExpanded(!expanded());
					}}
				>
					<BsSquareHalf class="rotate-180" />
				</Button>
			</Show>

			<Separator orientation="horizontal" />
			<div class="flex flex-col gap-1">
				<For each={items}>
					{(item) => {
						const location = useLocation();
						const Icon = item.icon;
						const href = `/org/${organization.data?.slug}/${item.path}`;

						const [currentPath, setCurrentPath] = createSignal(
							location.pathname,
						);

						createEffect(() => {
							setCurrentPath(location.pathname);
						});

						return (
							<Show
								when={expanded()}
								fallback={
									<Button
										variant="ghost"
										as="a"
										href={href}
										class={`text-foreground ${currentPath().startsWith(href) ? "bg-primary/20" : ""}`}
										title={item.name}
									>
										<Icon />
									</Button>
								}
							>
								<a
									class={`flex items-center gap-2 text-foreground px-5 py-2 transition-colors hover:bg-primary/20 hover:no-underline rounded-lg ${currentPath().startsWith(href) ? "bg-primary/20" : ""}`}
									href={href}
								>
									<span>
										<Icon />
									</span>
									<span>{item.name}</span>
								</a>
							</Show>
						);
					}}
				</For>
			</div>
		</Motion.aside>
	);
}

export default OrganizationSidebar;