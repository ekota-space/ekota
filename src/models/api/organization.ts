import type { ApiUser } from "./user";

export interface ApiOrganization {
	id: string;
	name: string;
	created_at: string;
	description: string;
	updated_at: string;
	owner_id: string;
	owner?: Pick<
		ApiUser,
		"id" |"email" | "first_name" | "last_name" |  "username"
	>;
}
