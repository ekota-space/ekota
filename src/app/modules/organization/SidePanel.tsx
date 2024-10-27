"use client";
import BottomNavigation from "@/components/bottom-navigation/BottomNavigation";
import useRoutePath from "@/utils/hooks/use-route-path";
import React from "react";
import type { PropsWithChildren } from "react";
import { RiMessage3Fill, RiTeamLine } from "react-icons/ri";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import ChatsPanel from "../chats/ChatsPanel";
import { useParams } from "next/navigation";
import TeamsPanel from "../teams/panel/TeamsPanel";

interface TabListItem {
	href: string;
	icon: React.JSX.Element;
	isActive: (pathname: string) => boolean;
	content: React.ComponentType;
}

const tabList: TabListItem[] = [
	{
		icon: <RiMessage3Fill />,
		href: "chats",
		isActive: (pathname) => pathname.startsWith("/o/[slug]/chats"),
		content: ChatsPanel,
	},
	{
		icon: <RiTeamLine />,
		href: "teams",
		isActive: (pathname) => pathname.startsWith("/o/[slug]/teams"),
    content: TeamsPanel,
	},
];

export default function OrganizationSidePanel({ children }: PropsWithChildren) {
	const routePath = useRoutePath();
	const { slug } = useParams<{ slug: string }>();
	const ActiveTabPanel =
		tabList.find((tab) => tab.isActive(routePath))?.content ?? React.Fragment;
	return (
		<PanelGroup autoSaveId="main" direction="horizontal">
			<Panel defaultSize={25} maxSize={50} minSize={20}>
				<aside className="h-screen flex flex-col justify-between">
					<ActiveTabPanel />
					<BottomNavigation>
						{tabList.map((tab) => {
							return (
								<BottomNavigation.Item
									href={`/o/${slug}/${tab.href}`}
									key={tab.href}
									title=""
									active={tab.isActive(routePath)}
									icon={tab.icon}
								/>
							);
						})}
					</BottomNavigation>
				</aside>
			</Panel>
			<PanelResizeHandle className="bg-gray-300 dark:bg-gray-700 w-px" />
			<Panel>{children}</Panel>
		</PanelGroup>
	);
}
