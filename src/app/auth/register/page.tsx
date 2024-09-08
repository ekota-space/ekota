import RegistrationForm from "@/app/modules/auth/registration/RegistrationForm";
import { apiService } from "@/services/api/api";
import { Card } from "flowbite-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function RegisterPage() {
	const { data: user } = await apiService.user.me();

	if (user) {
		redirect("/");
	}

	return (
		<main className="h-screen flex justify-center items-center">
			<Card className="w-full max-w-md">
				<h2 className="text-2xl font-semibold">Get started</h2>
				<RegistrationForm />
				<p>
					<span>Already have an account?</span>
					<Link href="/auth/login" className="ml-2 underline">
						Log In!
					</Link>
				</p>
			</Card>
		</main>
	);
}

export default RegisterPage;
