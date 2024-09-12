import type { ApiOrganization } from "@/models/api/organization";
import { Endpoint } from "./endpoint";

export interface CreateOrganizationInput {
	name: string;
  slug: string;
	description?: string;
	owner_id: string;
}

export type DataResponse<T> = {
	data: T;
};

export type ApiOrganizationWithoutOwner = Omit<ApiOrganization, "owner">;

export default class OrganizationEndpoint extends Endpoint {
	async create(
		data: CreateOrganizationInput,
	): Promise<DataResponse<ApiOrganizationWithoutOwner>> {
		const response = await this.client.post<
			DataResponse<ApiOrganizationWithoutOwner>
		>("/organizations", data, {
			validateStatus: (status) => status === 201,
			headers: await this.defaultHeaders(),
		});

		return response.data;
	}

	async get(id: string): Promise<DataResponse<ApiOrganizationWithoutOwner>> {
		const response = await this.client.get<
			DataResponse<ApiOrganizationWithoutOwner>
		>(`/organizations/${id}`, {
			validateStatus: (status) => status === 200,
			headers: await this.defaultHeaders(),
		});

		return response.data;
	}

	async list(): Promise<DataResponse<ApiOrganizationWithoutOwner[]>> {
		const response = await this.client.get<
			DataResponse<ApiOrganizationWithoutOwner[]>
		>("/organizations", {
			validateStatus: (status) => status === 200,
			headers: await this.defaultHeaders(),
		});

		return response.data;
	}
}
