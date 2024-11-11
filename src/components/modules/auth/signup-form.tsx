import { createForm, FormError, valiForm } from "@modular-forms/solid";
import * as v from "valibot";

import { Button } from "~/components/ui/button";
import { FormTextField } from "~/components/form/text-field";
import { useSignup } from "~/lib/services/supabase/auth/use-signup";
import { useNavigate } from "@solidjs/router";
import { useProfileCreate } from "~/lib/services/supabase/profile/use-create";

const SignupFormSchema = v.pipe(
	v.object({
		firstName: v.pipe(v.string(), v.nonEmpty()),
		lastName: v.pipe(v.string(), v.nonEmpty()),
		username: v.pipe(
			v.string(),
			v.nonEmpty(),
			v.minLength(6),
			v.maxLength(20),
			v.regex(
				/^[a-z0-9_]+$/,
				"Only lowercase letters, numbers, and underscores are allowed",
			),
		),
		email: v.pipe(v.string(), v.nonEmpty(), v.email()),
		password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
		confirmPassword: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
	}),
	v.forward(
		v.check(
			(input) => input.password === input.confirmPassword,
			"Both passwords must be the same",
		),
		["confirmPassword"],
	),
);

type SignupFormValues = v.InferOutput<typeof SignupFormSchema>;

const SignupForm = () => {
	const [signupForm, { Form, Field }] = createForm<SignupFormValues>({
		validate: valiForm(SignupFormSchema),
	});
	const signup = useSignup();
	const profileCreate = useProfileCreate();
	const navigate = useNavigate();

	return (
		<Form
			class="flex flex-col space-y-3 p-4"
			onSubmit={async (input) => {
				const { data, error } = await signup.mutateAsync({
					email: input.email,
					password: input.password,
				});

				// TODO implement existing email/username error
				if (error) {
					throw new FormError<SignupFormValues>({
						email: "Email already exists",
					});
				}

				await profileCreate.mutateAsync({
					firstName: input.firstName,
					lastName: input.lastName,
					username: input.username,
				});

				navigate("/");
			}}
		>
			<div class="flex gap-2">
				<Field name="firstName">
					{(field, props) => (
						<FormTextField
							{...props}
							type="text"
							label="First Name"
							placeholder="Jane"
							value={field.value}
							error={field.error}
							required
						/>
					)}
				</Field>
				<Field name="lastName">
					{(field, props) => (
						<FormTextField
							{...props}
							type="text"
							label="Last Name"
							placeholder="Doe"
							value={field.value}
							error={field.error}
							required
						/>
					)}
				</Field>
			</div>
			<Field name="email">
				{(field, props) => (
					<FormTextField
						{...props}
						type="email"
						label="Email"
						placeholder="jane@example.com"
						value={field.value}
						error={field.error}
						required
					/>
				)}
			</Field>
			<Field name="username">
				{(field, props) => (
					<FormTextField
						{...props}
						type="text"
						label="Username"
						placeholder="jane_doe"
						value={field.value}
						error={field.error}
						required
					/>
				)}
			</Field>
			<Field name="password">
				{(field, props) => (
					<FormTextField
						{...props}
						type="password"
						label="Password"
						placeholder="Password"
						value={field.value}
						error={field.error}
						required
					/>
				)}
			</Field>
			<Field name="confirmPassword">
				{(field, props) => (
					<FormTextField
						{...props}
						type="password"
						label="Confirm Password"
						placeholder="Confirm Password"
						value={field.value}
						error={field.error}
						required
					/>
				)}
			</Field>
			<Button type="submit" class="self-end" disabled={signupForm.submitting}>
				Sign Up
			</Button>
		</Form>
	);
};

export default SignupForm;
