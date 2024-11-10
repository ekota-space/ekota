import { useNavigate } from "@solidjs/router";
import { createEffect, type JSX, type ParentProps } from "solid-js";
import session from "~/lib/services/supabase/auth/session";

function AuthLayout(props: ParentProps): JSX.Element {
	const navigate = useNavigate();

	createEffect(() => {
		if (session.session()) {
			navigate("/");
		}
	});

	return <div>{props.children}</div>;
}

export default AuthLayout;
