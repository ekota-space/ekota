import type { PostgrestError } from "@supabase/supabase-js";
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import type { Database } from "~/collection/types";
import supabase from "../supabase";
import { useOrgListKey } from "./use-list";
import {
	type SupabaseProfileRow,
	useProfileGetKey,
} from "../profile/use-get";

export type SupabaseOrganizationInsert =
	Database["public"]["Tables"]["Organizations"]["Insert"];
export const useOrgCreateKeys = ["org-create"];

export function useOrgCreate() {
	const queryClient = useQueryClient();

	return createMutation<
		void,
		PostgrestError,
		Omit<SupabaseOrganizationInsert, "createdAt" | "id" | "ownerId">
	>(() => {
		return {
			mutationKey: useOrgCreateKeys,
			mutationFn: async (data) => {
				const profile =
					queryClient.getQueryData<SupabaseProfileRow>(useProfileGetKey);
				if (!profile) {
					throw new Error("Profile not found");
				}

				await supabase
					.from("Organizations")
					.insert({
						...data,
						ownerId: profile?.id as string,
					})
					.throwOnError();
			},
			onSuccess() {
				queryClient.invalidateQueries({
					exact: true,
					queryKey: useOrgListKey,
				});
			},
		};
	});
}
