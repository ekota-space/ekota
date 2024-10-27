"use client";

import OrganizationForm from "@/app/modules/organization/OrganizationForm";
import useOrganizationList from "@/services/swr/organization/list";
import { Card } from "flowbite-react";
import React from "react";

function OrganizationNewPage() {
	const { data } = useOrganizationList();
	const hasOrgs = (data?.data?.length ?? 0) > 0;

	return (
		<main className="h-screen flex justify-center items-center">
			<Card className="max-w-md w-full">
				<h2 className="text-2xl text-center font-semibold">
					{hasOrgs
						? "Create an organization"
						: "Create your first organization"}
				</h2>
				<OrganizationForm />
			</Card>
		</main>
	);
}

export default OrganizationNewPage;
