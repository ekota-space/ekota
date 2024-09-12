"use client";

import useOrganizationList from "@/services/swr/organization/list";
import useMe from "@/services/swr/user/me";
import { Avatar, List } from "flowbite-react";
import Link from "next/link";
import React from "react";

function OrganizationList() {
	const { data: user } = useMe();
	const { data } = useOrganizationList();

	return (
		<List unstyled className="">
			{data?.data.map((org) => (
				<List.Item
					key={org.id}
					className="p-2 pb-3 sm:pb-4 hover:bg-zinc-50 active:bg-slate-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-800 transition-colors rounded-lg"
				>
					<Link href={`/o/${org.slug}`}>
						<div className="flex items-center justify-between">
							<div className="flex items-center rtl:space-x-reverse">
								<Avatar
									className="mr-4"
									size="md"
									rounded
									placeholderInitials={org.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								/>
								<div className="flex flex-col gap-0.5">
									<h3 className="text-lg">{org.name}</h3>
									<p className="text-sm text-zinc-400 dark:text-zinc-300">
										{org.description}
									</p>
								</div>
							</div>
							{user?.id === org.owner_id ? (
								<span className="justify-self-end">OWNED</span>
							) : null}
						</div>
					</Link>
				</List.Item>
			))}
		</List>
	);
}

export default OrganizationList;
