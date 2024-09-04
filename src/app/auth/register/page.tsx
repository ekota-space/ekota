import RegistrationForm from "@/app/modules/auth/registration/RegistrationForm";
import { Card } from "flowbite-react";
import Link from "next/link";
import React from "react";

function RegisterPage() {
	return (
		<main className="h-screen flex justify-center items-center">
			<Card className="w-full max-w-sm">
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
