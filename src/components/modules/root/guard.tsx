import { useLocation, useNavigate } from "@solidjs/router";
import { onMount, type ParentComponent } from "solid-js";
import supabase from "~/lib/services/supabase/supabase";

const RootGuard: ParentComponent = (props) => {
	const location = useLocation();
	const navigate = useNavigate();

	onMount(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			if (
				location.pathname === "/auth/login" ||
				location.pathname === "/auth/signup"
			) {
				if (user) {
					navigate("/");
				}
			} else {
				if (!user) {
					navigate("/auth/login");
				}
			}
		});
	});

	return <>{props.children}</>;
};

export default RootGuard;
