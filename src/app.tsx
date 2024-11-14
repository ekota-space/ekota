import "./app.css";
import "@fontsource/inter";

import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { onMount, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import {
	ColorModeProvider,
	ColorModeScript,
	cookieStorageManagerSSR,
} from "@kobalte/core";
import { getCookie } from "vinxi/http";

import { ModeToggle } from "./components/modules/root/color-mode";
import { startSession } from "./lib/services/supabase/auth/session";
import RootGuard from "./components/modules/root/guard";

function getServerCookies() {
	"use server";
	const colorMode = getCookie("kb-color-mode");
	return colorMode ? `kb-color-mode=${colorMode}` : "";
}

export default function App() {
	const storageManager = cookieStorageManagerSSR(
		isServer ? getServerCookies() : document.cookie,
	);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				staleTime: 5000,
			},
		},
	});

	onMount(() => {
		startSession(queryClient);
	});

	return (
		<QueryClientProvider client={queryClient}>
			<SolidQueryDevtools initialIsOpen={false} />
			<Router
				root={(props) => (
					<MetaProvider>
						<Title>Ekota | Collaborate as a team</Title>
						<ColorModeScript storageType={storageManager.type} />
						<ColorModeProvider storageManager={storageManager}>
							<ModeToggle />
							<RootGuard>
								<Suspense>{props.children}</Suspense>
							</RootGuard>
						</ColorModeProvider>
					</MetaProvider>
				)}
			>
				<FileRoutes />
			</Router>
		</QueryClientProvider>
	);
}
