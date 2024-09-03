import LoginForm from "@/app/modules/auth/login/LoginForm";
import { Card, HelperText } from "flowbite-react";
import React from "react";

const LoginPage = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<Card className="w-full max-w-sm">
				<h2 className="text-2xl text-center font-semibold">Welcome Back</h2>
				<LoginForm />
			</Card>
		</div>
	);
};

export default LoginPage;
