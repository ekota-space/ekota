import { BsPlus, BsThreeDots } from "solid-icons/bs";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import ProjectCreateForm from "../form";
import { createSignal } from "solid-js";

function OrganizationProjectRightActions() {
	const [open, setOpen] = createSignal(false);

	return (
		<div class="flex">
			<Dialog open={open()} onOpenChange={setOpen}>
				<DialogTrigger>
					<Button class="h-6 w-4 text-lg" variant="ghost">
						<BsPlus />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a project</DialogTitle>
					</DialogHeader>
					<ProjectCreateForm
						onCreated={() => {
							setOpen(false);
						}}
					/>
				</DialogContent>
			</Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="ghost" class="h-6 w-4">
						<BsThreeDots />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>New project</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default OrganizationProjectRightActions;
