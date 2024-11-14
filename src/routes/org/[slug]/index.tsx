import { useParams } from "@solidjs/router";

function OrganizationPage() {
	const { slug } = useParams<{ slug: string }>();

	return <div>{slug}</div>;
}

export default OrganizationPage;
