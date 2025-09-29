import { HabariSuperAdminService } from "@/services/HabariSuperAdminService";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useEmails = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: () => HabariSuperAdminService.getAll(),
  });
};

// Add label
export const useAddLabel = () => {
  return useMutation({
    mutationFn: ({ id, label }: { id: string; label: string }) =>
      HabariSuperAdminService.addLabel(id, label),
  });
};