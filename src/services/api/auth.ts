import { isBrowser } from "@/utils/is-browser";
import { Endpoint } from "./endpoint";
import type { AxiosInstance } from "axios";

export interface RegisterUserInput {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export interface LoginUserInput {
	email: string;
	password: string;
}

export interface AuthResponse {
	expirationDurationSeconds: number;
}

export default class AuthEndpoint extends Endpoint {
	private timer: NodeJS.Timeout | null = null;

	constructor(client: AxiosInstance) {
		super(client);

		this.onInit();
	}

	private async onInit() {
		if (typeof window === "undefined") {
			return;
		}
		const res = await this.refresh();
		if (res.status === 400 && res.data?.expiresAtSeconds) {
			const leftTimeMs = res.data.expiresAtSeconds * 1000 - Date.now();
			this.refreshIn(leftTimeMs);
		}
	}

	private refreshIn(durationMs: number): void {
		if (this.timer) {
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(async () => {
			const res = await this.refresh();

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
			this.refresh();
		}, durationMs);
	}

	async refresh() {
		const res = await this.client.get<
			| { expiresAtSeconds?: number; expirationDurationSeconds?: number }
			| undefined
		>("/auth/refresh", {
			validateStatus: (status) => {
				return status === 200 || status === 400;
			},
			headers: await this.defaultHeaders(),
		});
		return res;
	}

	async logout() {
		await this.client.get("/auth/logout", {
			headers: await this.defaultHeaders(),
		});
	}

	async updateGlobalHeaders() {
		if (isBrowser()) return;
		const headers = Object.fromEntries(
			await import("next/headers").then((s) => s.headers().entries()),
		);
		this.client.defaults.headers.common = headers;
	}

	async login(data: LoginUserInput): Promise<void> {
		const res = await this.client.post<AuthResponse>("/auth/login", data, {
			validateStatus(status) {
				return status === 200;
			},
		});

		this.refreshPeriodically(res.data.expirationDurationSeconds * 1000);
		await this.updateGlobalHeaders();
	}

	async register(data: RegisterUserInput): Promise<void> {
		const res = await this.client.post<AuthResponse>("/auth/register", data, {
			validateStatus(status) {
				return status === 201;
			},
		});

		this.refreshPeriodically(res.data.expirationDurationSeconds * 1000);
		await this.updateGlobalHeaders();
	}
}
