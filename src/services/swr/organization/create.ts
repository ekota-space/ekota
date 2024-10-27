import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import { apiService } from "@/services/api/api";


export default function useOrganizationCreate() {
	const { mutate } = useSWRConfig();

	const mutation = useSWRMutation<
		Awaited<ReturnType<typeof apiService.organizations.organizationsCreate>>,
		AxiosError,
		string,
		Parameters<typeof apiService.organizations.organizationsCreate>[0]
	>(SwrMutationKeys.useOrganizationCreate, (_, { arg }) =>
		apiService.organizations.organizationsCreate(arg),
	);

	return {
		...mutation,
		trigger: async (data: Parameters<typeof apiService.organizations.organizationsCreate>[0]) => {
			const result = await mutation.trigger(data);
			await mutate(SwrQueryKeys.useOrganizationList);

      return result;
		},
	};
}
