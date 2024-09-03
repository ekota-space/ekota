"use client";

import React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import TextFormInput from "@/components/form/TextFormInput";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordFormInput from "@/components/form/PasswordFormInput";

const loginFormFieldValidator = zod.object({
	email: zod.string().email(),
	password: zod.string().min(8).max(20),
});

type LoginFormFields = zod.infer<typeof loginFormFieldValidator>;

const LoginForm = () => {
	const form = useForm<LoginFormFields>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginFormFieldValidator),
	});

	const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
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

				<Button type="submit" className="mt-4">
					Log In
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
