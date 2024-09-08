"use client";

import { apiService } from "@/services/api/api";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";

function LogoutButton() {
  const router = useRouter();
	return (
		<Button
			onClick={async () => {
				await apiService.auth.logout();
        router.replace("/auth/login");
			}}
			color="warning"
		>
			Logout
		</Button>
	);
}

export default LogoutButton;
