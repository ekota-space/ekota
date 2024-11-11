import { createQuery } from "@tanstack/solid-query";
import type { Database } from "~/collection/types";
import supabase from "../supabase";
import session from "../auth/session";
import type { PostgrestError } from "@supabase/supabase-js";

export type SupabaseProfileRow = Database["public"]["Tables"]["Profile"]["Row"];
export const useProfileGetKey = ["get-profile"];

export function useProfileGet() {
	return createQuery<SupabaseProfileRow, PostgrestError>(() => {
		return {
			queryKey: useProfileGetKey,
			queryFn: async () => {
				const res = await supabase
					.from("Profile")
					.select("*")
					.eq("userId", session.session()?.user.id as string)
					.single();

				if (res.error) {
					throw res.error;
				}

				return res.data;
			},
		};
	});
}
