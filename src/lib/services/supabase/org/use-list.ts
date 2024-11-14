import { createQuery } from "@tanstack/solid-query";
import supabase from "../supabase";
import type { Database } from "~/collection/types";
import type { PostgrestError } from "@supabase/supabase-js";

export type SupabaseOrganizationRow =
	Database["public"]["Tables"]["Organizations"]["Row"];
export const useOrgListKey = ["org-list"];

export function useOrgList() {
	return createQuery<SupabaseOrganizationRow[], PostgrestError>(() => {
		return {
			queryKey: useOrgListKey,
			queryFn: async () => {
				const { data, error } = await supabase
					.from("Organizations")
					.select("*");

				if (error) {
					throw error;
				}

				return data;
			},
		};
	});
}
