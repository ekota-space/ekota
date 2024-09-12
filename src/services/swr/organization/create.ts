import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import { apiService } from "@/services/api/api";
import type { AxiosError } from "axios";
import type { CreateOrganizationInput } from "@/services/api/organization";

export default function useOrganizationCreate() {
	const { mutate } = useSWRConfig();

	const mutation = useSWRMutation<
		Awaited<ReturnType<typeof apiService.organization.create>>,
		AxiosError,
		string,
		CreateOrganizationInput
	>(SwrMutationKeys.useOrganizationCreate, (_, { arg }) =>
		apiService.organization.create(arg),
	);

	return {
		...mutation,
		trigger: async (data: CreateOrganizationInput) => {
			await mutation.trigger(data);
			await mutate(SwrQueryKeys.useOrganizationList);
		},
	};
}
