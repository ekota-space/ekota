import type { PostgrestError } from "@supabase/supabase-js";
import { createQuery } from "@tanstack/solid-query";
import type { Database } from "~/collection/types";
import supabase from "../supabase";
import { useOrgGet, useOrgGetKey } from "../org/use-get";
import { createEffect } from "solid-js";

export type SupabaseProjectRow =
	Database["public"]["Tables"]["Projects"]["Row"];
export const useProjectListKey = ["project-list"];

export function useProjectList() {
	const org = useOrgGet();

	const query = createQuery<SupabaseProjectRow[], PostgrestError>(() => {
		return {
			queryKey: useProjectListKey,
			queryFn: async () => {
				if (!org.data) {
					return [];
				}

				const { data, error } = await supabase
					.from("Projects")
					.select("*")
					.eq("organizationId", org.data.id);

				if (!data || error) {
					throw error;
				}

				return data;
			},
		};
	});

  createEffect(()=>{
    if(org.data) {
      query.refetch()
    }
  })

	return query;
}
