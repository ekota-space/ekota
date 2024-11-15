import type { PostgrestError } from "@supabase/supabase-js";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import type { Database } from "~/collection/types";
import supabase from "../supabase";
import slug from "slug";
import { generateShortId } from "~/lib/utils";
import { useOrgGet } from "../org/use-get";
import { useProjectListKey } from "./use-list";

export const useProjectCreateKey = ["project-app"];
export type SupabaseProjectInsert =
	Database["public"]["Tables"]["Projects"]["Insert"];

export function useProjectCreate() {
	const org = useOrgGet();

	return createMutation<
		void,
		PostgrestError,
		Pick<SupabaseProjectInsert, "name" | "description">
	>(() => {
		const queryClient = useQueryClient();

		return {
			mutationKey: useProjectCreateKey,
			mutationFn: async (data) => {
				if (!org.data) {
					return Promise.reject("Organization not found");
				}

				await supabase
					.from("Projects")
					.insert({
						...data,
						slug: `${slug(data.name)}-${generateShortId()}`,
						organizationId: org.data.id,
					})
					.throwOnError();
			},
			onSuccess() {
				queryClient.invalidateQueries({
					exact: true,
					queryKey: useProjectListKey,
				});
			},
		};
	});
}
