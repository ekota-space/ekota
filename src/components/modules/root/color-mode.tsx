import { useColorMode } from "@kobalte/core";

import { BsSun, BsLaptop, BsMoon } from "solid-icons/bs";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setColorMode } = useColorMode();

	return (
		<div class="absolute right-2 top-2">
			<DropdownMenu>
				<DropdownMenuTrigger
					as={Button<"button">}
					variant="ghost"
					size="sm"
					class="w-9 px-0"
				>
					<BsSun class="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<BsMoon class="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span class="sr-only">Toggle theme</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onSelect={() => setColorMode("light")}>
						<BsSun class="mr-2 size-4" />
						<span>Light</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setColorMode("dark")}>
						<BsMoon class="mr-2 size-4" />
						<span>Dark</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setColorMode("system")}>
						<BsLaptop class="mr-2 size-4" />
						<span>System</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
