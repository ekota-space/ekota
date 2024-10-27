import { Env } from "@/collections/env";
import { Auth } from "./Auth";
import { HttpClient } from "./http-client";
import { Organizations } from "./Organizations";
import { User } from "./User";
import { isBrowser } from "@/utils/is-browser";
import {
	AxiosHeaders,
	type InternalAxiosRequestConfig,
} from "axios";

class ApiService {
	auth: Auth;
	user: User;
	organizations: Organizations;

	constructor() {
		const httpClient = new HttpClient({
			baseURL: Env.API_URI,
			withCredentials: true,
			responseType: "json",
		});
		if (!isBrowser()) {
			httpClient.instance.interceptors.request.use(async (config) => {
				const globalHeaders = await import("next/headers").then((mod) =>
					mod.headers().entries(),
				);

				const headers = new AxiosHeaders(config.headers);

				for (const [key, value] of globalHeaders) {
					headers[key] = value;
				}

				return {
					...config,
					headers,
				} satisfies InternalAxiosRequestConfig;
			});
		}

		this.auth = new Auth(httpClient);
		this.user = new User(httpClient);
		this.organizations = new Organizations(httpClient);
	}
}

export const apiService = new ApiService();
