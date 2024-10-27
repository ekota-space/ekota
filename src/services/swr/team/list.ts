import { apiService } from "@/services/api/api";
import useSWR from "swr";
import { SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";

export function useTeamList(orgSlug: string) {
	return useSWR<
		Awaited<ReturnType<typeof apiService.organizations.teamsDetail>>["data"],
		AxiosError
	>([SwrQueryKeys.useTeamList, orgSlug], async () =>
		apiService.organizations.teamsDetail(orgSlug).then((res) => res.data),
	);
}
