"use client";

import PasswordFormInput from "@/components/form/PasswordFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, Button } from "flowbite-react";
import React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";

const registrationFormFieldValidator = zod
	.object({
		email: zod.string().email(),
		password: zod
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(20, "Password must be below 20 characters"),
		confirmPassword: zod
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(20, "Password must be below 20 characters"),
	})
	.refine(
		({ password, confirmPassword }) => {
			return password === confirmPassword;
		},
		{
			message: "Passwords must match",
			path: ["confirmPassword"],
		},
	);

type RegistrationFormFields = zod.infer<typeof registrationFormFieldValidator>;

function RegistrationForm() {
	const form = useForm<RegistrationFormFields>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(registrationFormFieldValidator),
	});

	const onSubmit: SubmitHandler<RegistrationFormFields> = (data) => {
		console.log(data);
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
			>
				<div className="mb-2 block">
					<Label htmlFor="email1" value="Your email" />
				</div>
				<TextFormInput
					id="email"
					name="email"
					type="email"
					placeholder="name@email.com"
				/>

				<div className="mb-2 block">
					<Label htmlFor="password" value="Your Password" />
				</div>
				<PasswordFormInput
					id="password"
					name="password"
					placeholder="8-20 characters long password"
				/>
				<div className="mb-2 block">
					<Label htmlFor="confirmPassword" value="Confirm your password" />
				</div>
				<PasswordFormInput
					id="confirmPassword"
					name="confirmPassword"
					placeholder="8-20 characters long password"
				/>

				<Button type="submit" className="mt-4">
					Register
				</Button>
			</form>
		</FormProvider>
	);
}

export default RegistrationForm;
