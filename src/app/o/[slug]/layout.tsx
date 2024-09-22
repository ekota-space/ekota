import OrganizationSidePanel from "@/app/modules/organization/SidePanel";
import React, { type PropsWithChildren } from "react";

function OrganizationLayout({ children }: PropsWithChildren) {
	return <OrganizationSidePanel>{children}</OrganizationSidePanel>;
}

export default OrganizationLayout;
