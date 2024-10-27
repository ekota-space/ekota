import useSWR from "swr";
import { SwrQueryKeys } from "../keys";
import type { AxiosError } from "axios";
import { apiService } from "@/services/api/api";

export default function useOrganizationList() {
	return useSWR<Awaited<ReturnType<typeof apiService.organizations.organizationsList>>["data"], AxiosError>(
		SwrQueryKeys.useOrganizationList,
		async () => apiService.organizations.organizationsList().then((res) => res.data),
	);
}
