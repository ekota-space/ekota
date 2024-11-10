import type { Session } from "@supabase/supabase-js";
import { createSignal, onCleanup } from "solid-js";
import supabase from "../supabase";

const [session, setSession] = createSignal<Session | null>(null);

export async function startSession() {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	setSession(session);

	const {
		data: { subscription },
	} = supabase.auth.onAuthStateChange((_, session) => {
		setSession(session);
	});

	onCleanup(() => {
		subscription?.unsubscribe();
	});
}

export default {
	session,
	setSession,
} as const;
