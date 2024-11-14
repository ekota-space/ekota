import type { ParentProps } from "solid-js";

function OrganizationLayout(props: ParentProps) {
	return <section>
    {props.children}
  </section>;
}

export default OrganizationLayout;
