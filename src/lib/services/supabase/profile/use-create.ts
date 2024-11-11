import { createMutation, useQueryClient } from "@tanstack/solid-query";
import session from "../auth/session";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "~/collection/types";
import supabase from "../supabase";
import { useProfileGetKey } from "./use-get";

export type SupabaseProfileInsert =
	Database["public"]["Tables"]["Profile"]["Insert"];
export const useProfileCreateKey = ["create-profile"];

export function useProfileCreate() {
	const queryClient = useQueryClient();

	return createMutation<
		void,
		PostgrestError,
		Omit<SupabaseProfileInsert, "userId" | "createdAt" | "id">
	>(() => {
		return {
			mutationKey: useProfileCreateKey,
			mutationFn: async (profile) => {
				const res = await supabase.from("Profile").insert({
					...profile,
					userId: session.session()?.user.id as string,
				});

				if (res.error) {
					throw res.error;
				}
			},
			async onSuccess() {
				await queryClient.invalidateQueries({
					queryKey: useProfileGetKey,
					exact: true,
				});
			},
		};
	});
}
