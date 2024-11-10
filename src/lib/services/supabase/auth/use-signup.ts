import { createMutation } from "@tanstack/solid-query";
import supabase from "../supabase";
import type {
	AuthError,
	AuthResponse,
} from "@supabase/supabase-js";
import session from "./session";

export const useSignupKey = ["signup"];
export function useSignup() {
	return createMutation<
		AuthResponse,
		AuthError,
		{ email: string; password: string }
	>(() => {
		return {
			mutationKey: useSignupKey,
			mutationFn: async (data) => {
				return await supabase.auth.signUp({
					email: data.email,
					password: data.password,
				});
			},
      onSuccess(data) {
          session.setSession(data.data.session);
      },
		};
	});
}
