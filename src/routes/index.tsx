import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import session from "~/lib/services/supabase/auth/session";

export default function Home() {
	const navigate = useNavigate();

	createEffect(() => {
		if (!session.session()) {
			navigate("/auth/login");
		}
	});

	return (
		<main>
			<h1>Hello world!</h1>
		</main>
	);
}
