"use client";

import { useTeamList } from "@/services/swr/team/list";
import { List } from "flowbite-react";
import Link from "next/link";
import { useParams, } from "next/navigation";
import React from "react";

function TeamsList() {
	const { slug } = useParams<{ slug: string }>();
	const teams = useTeamList(slug);

	return (
		<List
			unstyled
			className="divide-y divide-gray-200 dark:divide-gray-700 py-2"
		>
			{teams.data?.data?.map((team) => (
				<Link key={team.id} href={`/o/${slug}/teams/${team.slug}`}>
					<List.Item className="p-2 hover:rounded-lg hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 active:select-none">
						<div className="flex items-center space-x-4 rtl:space-x-reverse">
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium text-gray-900 dark:text-white">
									{team.name}
								</p>
								<p className="truncate text-sm text-gray-500 dark:text-gray-400">
									{team.description}
								</p>
							</div>
						</div>
					</List.Item>
				</Link>
			))}
		</List>
	);
}

export default TeamsList;
