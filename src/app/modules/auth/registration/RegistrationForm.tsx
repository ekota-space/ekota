"use client";

import PasswordFormInput from "@/components/form/PasswordFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import useAuthRegister from "@/services/swr/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Label, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import zod from "zod";
import { omit } from "lodash-es";

const registrationFormFieldValidator = zod
	.object({
		first_name: zod
			.string()
			.min(2, "First name must be at least 2 characters long"),
		last_name: zod
			.string()
			.min(2, "Last name must be at least 2 characters long"),
		username: zod
			.string()
			.min(6, "Username must be at least 6 characters long")
			.max(16, "Username must be below 16 characters")
			.regex(/^[a-zA-Z0-9_]+$/, "Only a-z A-Z 0-9 and _ are allowed"),

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
	const router = useRouter();
	const { trigger } = useAuthRegister();

	const form = useForm<RegistrationFormFields>({
		resolver: zodResolver(registrationFormFieldValidator),
	});

	const onSubmit: SubmitHandler<RegistrationFormFields> = async (data) => {
		try {
			await trigger(omit(data, "confirmPassword"));
			form.reset();
			router.push("/");
		} catch (error) {
			if (error instanceof AxiosError && error.status === 400) {
				form.setError(
					error.response?.data.error === "Username already exists"
						? "username"
						: "email",
					{ message: error.response?.data.error },
					{ shouldFocus: true },
				);
			}
		}
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-center gap-2"
			>
				<div className="flex flex-col md:flex-row gap-2">
					<div className="w-full">
						<div className="block">
							<Label htmlFor="firstName" value="First name" />
						</div>
						<TextFormInput id="firstName" name="first_name" placeholder="John" />
					</div>
					<div className="w-full">
						<div className="block">
							<Label htmlFor="lastName" value="Last name" />
						</div>
						<TextFormInput id="lastName" name="last_name" placeholder="Doe" />
					</div>
				</div>

				<div className="block">
					<Label htmlFor="email" value="Your email" />
				</div>
				<TextFormInput
					id="email"
					name="email"
					type="email"
					placeholder="name@email.com"
				/>

				<div className="block">
					<Label htmlFor="username" value="Username" />
				</div>
				<TextFormInput id="username" name="username" placeholder="john_doe" />

				<div className="block">
					<Label htmlFor="password" value="Your Password" />
				</div>
				<PasswordFormInput
					id="password"
					name="password"
					placeholder="8-20 characters long password"
				/>
				<div className="block">
					<Label htmlFor="confirmPassword" value="Confirm your password" />
				</div>
				<PasswordFormInput
					id="confirmPassword"
					name="confirmPassword"
					placeholder="8-20 characters long password"
				/>

				<Button
					type="submit"
					className="mt-4"
					isProcessing={form.formState.isSubmitting}
				>
					Register
				</Button>
			</form>
		</FormProvider>
	);
}

export default RegistrationForm;
