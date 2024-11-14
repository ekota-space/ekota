import { createQuery } from "@tanstack/solid-query";
import type { Database } from "~/collection/types";
import supabase from "../supabase";
import type { PostgrestError } from "@supabase/supabase-js";

export type SupabaseProfileRow =
	Database["public"]["Tables"]["Profiles"]["Row"];
export const useProfileGetKey = ["get-profile"];

export function useProfileGet() {
	const query =  createQuery<SupabaseProfileRow, PostgrestError>(() => {
		return {
			queryKey: useProfileGetKey,
			queryFn: async () => {
				const {
					data: { user },
          error
				} = await supabase.auth.getUser();

				if (!user || error) {
					return Promise.reject(`User not found: ${error}`);
				}

				const res = await supabase
					.from("Profiles")
					.select("*")
					.eq("userId", user.id)
					.single();

				if (res.error) {
					return Promise.reject(res.error);
				}

				return res.data;
			},
		};
	});

  return query;
}
