import { BsCommand, BsSearch } from "solid-icons/bs";
import { createSignal, createEffect, onCleanup } from "solid-js";
import { Button } from "~/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "~/components/ui/command";

function OrganizationSearchBar() {
	const [open, setOpen] = createSignal(false);

	createEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);

		onCleanup(() => {
			document.removeEventListener("keydown", down);
		});
	});

	return (
		<div class="flex justify-center py-2">
			<Button
				id="search-trigger"
				variant="outline"
				class="relative w-full max-w-96 justify-between space-x-4 text-muted-foreground"
				onClick={() => setOpen(true)}
			>
				<div class="flex items-center space-x-2">
					<BsSearch />
					<span class="hidden lg:inline-flex">Search organization...</span>
					<span class="inline-flex lg:hidden">Search...</span>
				</div>
				<kbd class="pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">
					<BsCommand stroke-width={1} />
					<span>K</span>
				</kbd>
			</Button>
			<CommandDialog open={open()} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>Profile</CommandItem>
						<CommandItem>Billing</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}

export default OrganizationSearchBar;
