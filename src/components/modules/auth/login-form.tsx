import { createForm, FormError, valiForm } from "@modular-forms/solid";
import * as v from "valibot";
import {useNavigate} from "@solidjs/router"

import { Button } from "~/components/ui/button";
import { FormTextField } from "~/components/form/text-field";
import { useLogin } from "~/lib/services/supabase/auth/use-login";

const LoginFormSchema = v.object({
	email: v.pipe(v.string(), v.nonEmpty(), v.email()),
	password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8)),
});

type LoginFormValues = v.InferOutput<typeof LoginFormSchema>;

const LoginForm = () => {
	const [_, { Form, Field }] = createForm<LoginFormValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validate: valiForm(LoginFormSchema),
	});
	const login = useLogin();
  const navigate = useNavigate()

	return (
		<Form
			class="flex flex-col space-y-3 p-4"
			onSubmit={async (data) => {
				const { error } = await login.mutateAsync({
					email: data.email,
					password: data.password,
				});
				// TODO implement wrong email password error
				// TODO implement non existent email error
        if (error) {
					throw new FormError<LoginFormValues>({
						email: "Email does not exist",
					});
				}
        navigate("/")
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
			<Button type="submit" class="self-end">
				Login
			</Button>
		</Form>
	);
};

export default LoginForm;
