import { createForm, valiForm } from "@modular-forms/solid";
import * as v from "valibot";
import { FormTextField } from "~/components/form/text-field";
import { Button } from "~/components/ui/button";
import { useProjectCreate } from "~/lib/services/supabase/project/use-create";

const ProjectCreateSchema = v.object({
	name: v.pipe(v.string(), v.nonEmpty()),
	description: v.nullable(v.string()),
});

type ProjectCreateFields = v.InferOutput<typeof ProjectCreateSchema>;

function ProjectCreateForm(props: { onCreated: () => void }) {
	const [_, { Form, Field }] = createForm<ProjectCreateFields>({
		validate: valiForm(ProjectCreateSchema),
	});
	const projectCreate = useProjectCreate();

	return (
		<Form
			class="flex flex-col gap-4"
			onSubmit={async (data) => {
				await projectCreate.mutateAsync(data);
        props.onCreated();
			}}
		>
			<Field name="name">
				{(field, props) => (
					<FormTextField
						{...props}
						type="text"
						value={field.value}
						error={field.error}
						label="Name"
						placeholder="Project Name"
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
						placeholder="Say something about your project"
						required
						multiline
					/>
				)}
			</Field>
			<Button class="mt-5" type="submit">
				Create
			</Button>
		</Form>
	);
}

export default ProjectCreateForm;
