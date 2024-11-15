import { type Component, Show } from "solid-js";
import { Button } from "~/components/ui/button";

interface Props {
	expanded: boolean;
	href: string;
	name: string;
	icon: Component;
	isActive:  boolean;
}

function OrganizationSidebarItem(props: Props) {
	const Icon = props.icon;

	return (
		<Show
			when={props.expanded}
			fallback={
				<Button
					variant="ghost"
					as="a"
					href={props.href}
					class={`text-foreground ${props.isActive ? "bg-primary/20" : ""}`}
					title={props.name}
				>
					<Icon />
				</Button>
			}
		>
			<a
				class={`flex items-center gap-2 text-foreground px-2 py-1 transition-colors hover:bg-primary/20 hover:no-underline rounded-lg text-sm ${props.isActive ? "bg-primary/20" : ""}`}
				href={props.href}
			>
				<span class="text-xs">
					<Icon />
				</span>
				<span>{props.name}</span>
			</a>
		</Show>
	);
}

export default OrganizationSidebarItem;
