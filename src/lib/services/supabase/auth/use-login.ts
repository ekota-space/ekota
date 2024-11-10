import { createMutation } from "@tanstack/solid-query";
import supabase from "../supabase";
import type {
	AuthError,
	AuthTokenResponsePassword,
} from "@supabase/supabase-js";

export const useLoginKey = ["login"];
export function useLogin() {
	return createMutation<
		AuthTokenResponsePassword,
		AuthError,
		{ email: string; password: string }
	>(() => {
		return {
			mutationKey: useLoginKey,
			mutationFn: async (data) => {
				return await supabase.auth.signInWithPassword({
					email: data.email,
					password: data.password,
				});
			},
		};
	});
}