"use client";

import { Env } from "@/collections/env";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import React from "react";

function LoginButton() {
	return (
		<Button
			onClick={() => {
				signIn("zitadel", { callbackUrl: `${Env.ORIGIN}/` });
			}}
		>
			Login
		</Button>
	);
}

export default LoginButton;
