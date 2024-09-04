import LoginForm from "@/app/modules/auth/login/LoginForm";
import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
	return (
		<main className="h-screen flex justify-center items-center">
			<Card className="w-full max-w-sm">
				<h2 className="text-2xl text-center font-semibold">Welcome Back</h2>
				<LoginForm />
				<p>
					<span>Don't have an account?</span>
					<Link href="/auth/register" className="ml-2 underline">Register now!</Link>
				</p>
			</Card>
		</main>
	);
};

export default LoginPage;
