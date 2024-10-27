"use client";

import TextAreaFormInput from "@/components/form/TextAreaFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import { useTeamCreate } from "@/services/swr/team/create";
import useMe from "@/services/swr/user/me";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Button, Label } from "flowbite-react";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import zod from "zod";

interface Props {
	onSubmitted: () => void;
}

const teamsSchema = zod.object({
	name: zod.string().min(3).max(255),
	slug: zod
		.string()
		.min(3)
		.max(16)
		.regex(/^[a-z0-9_-]+$/i, "Slug can only contain a-z, 0-9, _ and -"),
	description: zod.string().optional(),
});

export type TeamsFormFields = zod.infer<typeof teamsSchema>;

function TeamsForm({ onSubmitted }: Props) {
	const params = useParams<{ slug: string }>();
	const form = useForm<TeamsFormFields>({
		resolver: zodResolver(teamsSchema),
	});

	const mutation = useTeamCreate(params.slug);

	const onSubmit = useCallback(
		async (data: TeamsFormFields) => {
			try {
				await mutation.trigger({
					name: data.name,
					slug: data.slug,
					description: data.description,
				});

				onSubmitted();
			} catch (error) {
				if (
					error instanceof AxiosError &&
					error.response?.data?.error === "Slug already exists"
				) {
					form.setError("slug", {
						type: "manual",
						message: "Slug already exists",
					});
				}
			}
		},
		[mutation.trigger, onSubmitted, form.setError],
	);

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-2"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex gap-2">
					<div className="flex flex-col w-full">
						<div className="mb-2 block">
							<Label htmlFor="name" value="Team's Name" />
						</div>
						<TextFormInput
							id="name"
							name="name"
							placeholder="Name of your team"
						/>
					</div>

					<div className="flex flex-col w-full">
						<div className="mb-2 block">
							<Label htmlFor="slug" value="Team's Slug" />
						</div>
						<TextFormInput
							id="slug"
							name="slug"
							placeholder="Unique short name"
						/>
					</div>
				</div>

				<div className="mb-2 block">
					<Label htmlFor="description" value="Team's Description" />
				</div>
				<TextAreaFormInput
					id="description"
					name="description"
					placeholder="What does the team do?"
					rows={5}
				/>

				<div className="flex gap-2 justify-end">
					<Button type="button" color="gray" onClick={onSubmitted}>
						Cancel
					</Button>
					<Button type="submit">Create</Button>
				</div>
			</form>
		</FormProvider>
	);
}

export default TeamsForm;
