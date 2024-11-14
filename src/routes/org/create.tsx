import { createForm, FormError, valiForm } from "@modular-forms/solid";
import * as v from "valibot";
import { FormTextField } from "~/components/form/text-field";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "~/components/ui/dialog";
import { useOrgCreate } from "~/lib/services/supabase/org/use-create";
import { useNavigate } from "@solidjs/router";
import PostgresErrors from "~/lib/services/errors/postgres";
import { useProfileGet } from "~/lib/services/supabase/profile/use-get";

const OrganizationSchema = v.object({
	name: v.pipe(v.string(), v.nonEmpty()),
	description: v.nullable(v.string()),
	slug: v.pipe(
		v.string(),
		v.minLength(6),
		v.maxLength(20),
		v.nonEmpty(),
		v.regex(/^[a-z0-9-]+$/), // Only lowercase letters, numbers, and hyphens
	),
});
type OrganizationInput = v.InferOutput<typeof OrganizationSchema>;
const OrganizationCreate = () => {
	const navigate = useNavigate();
	const createOrg = useOrgCreate();
	const [_, { Form, Field }] = createForm<OrganizationInput>({
		validate: valiForm(OrganizationSchema),
	});
  useProfileGet();

	return (
		<div>
			<Dialog open onOpenChange={() => navigate(-1)}>
				<DialogContent>
					<DialogHeader>
						<h2>Create an Organization</h2>
					</DialogHeader>
					<Form
						onSubmit={async (data) => {
							try {
								await createOrg.mutateAsync(data);
								navigate(`/org/${data.slug}`);
							} catch (error) {
								if (PostgresErrors.isDuplicateError(error)) {
									throw new FormError<OrganizationInput>({
										slug: "Slug is already taken",
									});
								}
							}
						}}
						class="flex flex-col gap-2"
					>
						<Field name="name">
							{(field, props) => (
								<FormTextField
									{...props}
									type="text"
									value={field.value}
									error={field.error}
									label="Name"
									placeholder="Organization Name"
									required
								/>
							)}
						</Field>
						<Field name="slug">
							{(field, props) => (
								<FormTextField
									{...props}
									type="text"
									value={field.value}
									error={field.error}
									label="Slug"
									placeholder="organization-name"
									required
								/>
							)}
						</Field>
						<Field name="description">
							{(field, props) => (
								<FormTextField
									{...props}
									type="text"
									value={field.value ?? ""}
									error={field.error}
									label="Description"
									placeholder="Say something about your organization"
									required
									multiline
								/>
							)}
						</Field>
						<DialogFooter>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default OrganizationCreate;
