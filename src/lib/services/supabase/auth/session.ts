import type { Session } from "@supabase/supabase-js";
import { createSignal, onCleanup } from "solid-js";
import supabase from "../supabase";
import type { QueryClient } from "@tanstack/solid-query";
import { useProfileGetKey } from "../profile/use-get";

const [session, setSession] = createSignal<Session | null>(null);

export async function startSession(queryClient: QueryClient) {
	let {
		data: { session },
	} = await supabase.auth.getSession();

	if (session?.expires_at && new Date(session.expires_at * 1000) < new Date()) {
		session = await supabase.auth
			.refreshSession()
			.then(({ data }) => data.session);
		return;
	}

	setSession(session);
	queryClient.invalidateQueries({ queryKey: useProfileGetKey, exact: true });

	const {
		data: { subscription },
	} = supabase.auth.onAuthStateChange((_, session) => {
		setSession(session);
		queryClient.invalidateQueries({ queryKey: useProfileGetKey, exact: true });
	});

	onCleanup(() => {
		subscription?.unsubscribe();
	});
}

export default {
	session,
	setSession,
} as const;
