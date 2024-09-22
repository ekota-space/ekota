"use client";
import { apiService } from "@/services/api/api";
import useMe from "@/services/swr/user/me";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootNavbar() {
	const me = useMe();
	const router = useRouter();

	return (
		<Navbar fluid rounded>
			<Navbar.Brand href="/">
				{/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Ekota
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Dropdown
					arrowIcon={false}
					inline
					label={
						<Avatar
							alt="Profile Picture"
							img=""
							placeholderInitials={
								(me.data?.first_name[0] ?? "") + (me.data?.last_name[0] ?? "")
							}
							rounded
						/>
					}
				>
					<Link href="/profile/me">
						<Dropdown.Header className="hover:underline">
							<span className="block text-sm">
								{me.data?.first_name ?? ""} {me.data?.last_name ?? ""}
							</span>
							<span className="block truncate text-sm font-medium">
								@{me?.data?.username ?? ""}
							</span>
						</Dropdown.Header>
					</Link>
					<Dropdown.Item>Dashboard</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item>Earnings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item
						onClick={async () => {
							await apiService.auth.logout();
							router.replace("/auth/login");
						}}
					>
						Sign out
					</Dropdown.Item>
				</Dropdown>
				{/* <Navbar.Toggle /> */}
			</div>
			{/* <NavbarCollapse>
      </NavbarCollapse> */}
		</Navbar>
	);
}
