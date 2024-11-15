import { createQuery } from "@tanstack/solid-query";
import supabase from "../supabase";

import type { PostgrestError } from "@supabase/supabase-js";
import type { SupabaseOrganizationRow } from "./use-list";
import { useParams } from "@solidjs/router";

export const useOrgGetKey = (slug: string) => ["org-get", slug];

export function useOrgGet() {
	const { slug } = useParams<{ slug: string }>();

	return createQuery<SupabaseOrganizationRow, PostgrestError>(() => {
		return {
			queryKey: useOrgGetKey(slug),
			queryFn: async () => {
				const { data, error } = await supabase
					.from("Organizations")
					.select("*")
					.eq("slug", slug)
					.single();

				if (error) {
					throw error;
				}

				return data;
			},
		};
	});
}
