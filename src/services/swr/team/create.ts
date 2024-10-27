import useSWRMutation from "swr/mutation";
import { SwrMutationKeys } from "../keys";
import type { AxiosError } from "axios";
import { apiService } from "@/services/api/api";

export function useCreateTeam(orgId: string) {
  const mutation = useSWRMutation<
    Awaited<ReturnType<typeof apiService.organizations.teamsCreate>>,
    AxiosError,
    string,
    Parameters<typeof apiService.organizations.teamsCreate>[1]
  >(
    SwrMutationKeys.useTeamCreate,
    (_, {arg})=> apiService.organizations.teamsCreate(orgId, arg)
  )

  return {
    ...mutation,
    trigger: async (data: Parameters<typeof apiService.organizations.teamsCreate>[1]) => {
      const result = await mutation.trigger(data);

      // Refresh the teams list
      return result;
    }
  }
}