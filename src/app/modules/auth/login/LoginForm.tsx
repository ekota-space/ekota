"use client";

import React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import TextFormInput from "@/components/form/TextFormInput";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordFormInput from "@/components/form/PasswordFormInput";
import Link from "next/link";
import useAuthLogin from "@/services/swr/auth/login";
import { useRouter } from "next/navigation";

const loginFormFieldValidator = zod.object({
	email: zod.string().email(),
	password: zod
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(20, "Password must be below 20 characters"),
});

type LoginFormFields = zod.infer<typeof loginFormFieldValidator>;

const LoginForm = () => {
	const router = useRouter();
	const { trigger, error } = useAuthLogin();

	const form = useForm<LoginFormFields>({
		resolver: zodResolver(loginFormFieldValidator),
	});

	const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
		await trigger(data);
		form.reset();
		router.push("/");
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
			>
				<div className="mb-2 block">
					<Label htmlFor="email" value="Your email" />
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
				<Link href="/auth/password/reset" className="underline text-end">
					Forgot password?
				</Link>

				{error ? (
					<span className="text-red-500">
						{(error.response?.data as { error: string })?.error ?? error.message}
					</span>
				) : null}

				<Button
					type="submit"
					className="mt-4"
					isProcessing={form.formState.isSubmitting}
				>
					Log In
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
