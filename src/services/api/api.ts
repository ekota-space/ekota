import { Env } from "@/collections/env";
import { Auth } from "./Auth";
import { HttpClient } from "./http-client";
import { Organizations } from "./Organizations";
import { User } from "./User";
import { isBrowser } from "@/utils/is-browser";
import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

class ApiService {
	private timer: NodeJS.Timeout | null = null;
	private client: HttpClient;

	auth: Auth;
	user: User;
	organizations: Organizations;

	constructor() {
		this.client = new HttpClient({
			baseURL: Env.API_URI,
			withCredentials: true,
			responseType: "json",
		});

		this.auth = new Auth(this.client);
		this.user = new User(this.client);
		this.organizations = new Organizations(this.client);

		this.onInit();
	}

	private async onInit() {
		if (!isBrowser()) {
			this.client.instance.interceptors.request.use(async (config) => {
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

		this.client.instance.interceptors.response.use(async (config) => {
			if (
				config.config.url &&
				((config.config.url.endsWith("/auth/register") &&
					config.status === 201) ||
					(config.config.url.endsWith("/auth/login") && config.status === 200))
			) {
				this.refreshPeriodically(config.data.expirationDurationSeconds * 1000);
				await this.updateGlobalHeaders();
			}

			return config;
		});

		if (isBrowser()) {
			const res = await this.auth.refreshList({
				validateStatus(status) {
					return status === 200 || status === 400;
				},
			});
      
			if (res.status === 400 && res.data?.expirationDurationSeconds) {
				const leftTimeMs =
					res.data.expirationDurationSeconds * 1000 - Date.now();
				this.refreshIn(leftTimeMs);
			}
		}
	}

	private refreshIn(durationMs: number): void {
		if (this.timer) {
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(async () => {
			const res = await this.auth.refreshList({
				validateStatus(status) {
					return status === 200 || status === 400;
				},
			});

			if (res.status === 200 && res.data?.expirationDurationSeconds) {
				this.refreshPeriodically(res.data?.expirationDurationSeconds * 1000);
			}
		}, durationMs);
	}

	private refreshPeriodically(durationMs: number): void {
		if (this.timer) {
			clearInterval(this.timer);
		}

		this.timer = setInterval(() => {
			this.auth.refreshList({
				validateStatus(status) {
					return status === 200 || status === 400;
				},
			});
		}, durationMs);
	}

	async updateGlobalHeaders() {
		if (isBrowser()) return;
		const headers = Object.fromEntries(
			await import("next/headers").then((s) => s.headers().entries()),
		);
		this.client.instance.defaults.headers.common = headers;
	}
}

export const apiService = new ApiService();
