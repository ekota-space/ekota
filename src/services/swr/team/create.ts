import useSWRMutation from "swr/mutation";
import { SwrMutationKeys, SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import { apiService } from "@/services/api/api";
import { useSWRConfig } from "swr";

export function useTeamCreate(orgSlug: string) {
	const { mutate } = useSWRConfig();
	const mutation = useSWRMutation<
		Awaited<ReturnType<typeof apiService.organizations.teamsCreate>>,
		AxiosError,
		string,
		Parameters<typeof apiService.organizations.teamsCreate>[1]
	>(SwrMutationKeys.useTeamCreate, (_, { arg }) =>
		apiService.organizations.teamsCreate(orgSlug, arg),
	);

	return {
		...mutation,
		trigger: async (
			data: Parameters<typeof apiService.organizations.teamsCreate>[1],
		) => {
			const result = await mutation.trigger(data);

			await mutate([SwrQueryKeys.useTeamList, orgSlug]);
			return result;
		},
	};
}
