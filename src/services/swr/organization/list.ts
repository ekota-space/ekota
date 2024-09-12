import useSWR from "swr";
import { SwrQueryKeys } from "../keys";
import { apiService } from "@/services/api/api";
import type { AxiosError } from "axios";

export default function useOrganizationList() {
	return useSWR<Awaited<ReturnType<typeof apiService.organization.list>>, AxiosError>(
		SwrQueryKeys.useOrganizationList,
		async () => await apiService.organization.list(),
	);
}
