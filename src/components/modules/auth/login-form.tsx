import { createForm, valiForm } from "@modular-forms/solid";
import * as v from "valibot";

import { Button } from "~/components/ui/button";
import { FormTextField } from "~/components/form/text-field";

const LoginFormSchema = v.object({
	email: v.pipe(v.string(), v.nonEmpty(), v.email()),
	password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
});

type LoginFormValues = v.InferOutput<typeof LoginFormSchema>;

const LoginForm = () => {
	const [loginForm, { Form, Field }] = createForm<LoginFormValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validate: valiForm(LoginFormSchema),
	});

	return (
		<Form
			class="flex flex-col space-y-3 p-4"
			onSubmit={(data) => {
				console.log(data);
			}}
		>
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
			<Button type="submit" class="self-end">Login</Button>
		</Form>
	);
};

export default LoginForm;
