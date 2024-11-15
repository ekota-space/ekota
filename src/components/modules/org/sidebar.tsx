import { useLocation, useParams } from "@solidjs/router";
import { BsChat, BsGrid1x2, BsSquareHalf } from "solid-icons/bs";
import { TbUsersGroup } from "solid-icons/tb";
import { createEffect, createSignal, For, Show } from "solid-js";
import { clientOnly } from "@solidjs/start";
import { Motion } from "solid-motionone";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useOrgGet } from "~/lib/services/supabase/org/use-get";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import OrganizationSidebarItem from "./sidebar-item";
import OrganizationProjectRightActions from "../project/sidebar/right-actions";
import OrganizationNestedProjects from "../project/sidebar/nested-projects";



const items = [
	{
		name: "Projects",
		path: "projects",
		icon: BsGrid1x2,
		children: OrganizationNestedProjects,
		actions: OrganizationProjectRightActions,
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
						const { slug } = useParams<{ slug: string }>();
						const href = `/org/${slug}/${item.path}`;

						const [currentPath, setCurrentPath] = createSignal(
							location.pathname,
						);

						createEffect(() => {
							setCurrentPath(location.pathname);
						});

						const ItemChildren = item.children;
						const Actions = item.actions ?? (() => <></>);

						if (ItemChildren) {
							return (
								<Accordion multiple={false} collapsible value={["item-1"]}>
									<AccordionItem value="item-1" class="border-none">
										<div class="flex items-center">
											<AccordionTrigger>
												<OrganizationSidebarItem
													name={item.name}
													expanded={expanded()}
													href=""
													icon={item.icon}
													isActive={false}
												/>
											</AccordionTrigger>
											<Actions />
										</div>
										<AccordionContent>
											<ItemChildren />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							);
						}

						return (
							<OrganizationSidebarItem
								name={item.name}
								expanded={expanded()}
								href={href}
								icon={item.icon}
								isActive={currentPath().startsWith(href)}
							/>
						);
					}}
				</For>
			</div>
		</Motion.aside>
	);
}

export default OrganizationSidebar;
