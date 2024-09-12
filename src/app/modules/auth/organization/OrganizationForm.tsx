"use client";

import TextAreaFormInput from "@/components/form/TextAreaFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import useOrganizationCreate from "@/services/swr/organization/create";
import useMe from "@/services/swr/user/me";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import zod from "zod";

const organizationSchema = zod.object({
	name: zod.string().min(3).max(255),
	description: zod.string().min(3).max(255).optional(),
});

type OrganizationFormFields = zod.infer<typeof organizationSchema>;

function OrganizationForm() {
  const router = useRouter();
  
	const form = useForm<OrganizationFormFields>({
		resolver: zodResolver(organizationSchema),
	});
	const mutation = useOrganizationCreate();
	const me = useMe();

	const onSubmit = useCallback(
		async (data: OrganizationFormFields) => {
			if (!me.data?.id) {
				return;
			}

			await mutation.trigger({
				name: data.name,
				description: data.description,
				owner_id: me.data?.id,
			});

      router.push("/");
		},
		[me.data?.id, mutation.trigger, router.push],
	);

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-2"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="mb-2 block">
					<Label htmlFor="name" value="Organization's Name" />
				</div>
				<TextFormInput id="name" name="name" placeholder="Name of your organization" />

				<div className="mb-2 block">
					<Label htmlFor="description" value="Organization's Description" />
				</div>
				<TextAreaFormInput
					id="description"
					name="description"
					placeholder="What does the organization do?"
          rows={5}
				/>

				<Button type="submit">Create</Button>
			</form>
		</FormProvider>
	);
}

export default OrganizationForm;
