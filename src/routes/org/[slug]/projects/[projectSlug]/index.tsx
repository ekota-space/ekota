import { useParams } from "@solidjs/router";

function ProjectPage() {
	const { projectSlug } = useParams<{ projectSlug: string }>();

	return <div>{projectSlug}</div>;
}

export default ProjectPage;
