import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import { toast } from "react-toastify";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data } = await client.get("/accounts/");
      return data;
    },
    staleTime: 1000 * 60,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tipo_conta) => {
      const { data } = await client.post("/accounts/", { tipo_conta });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      toast.success("Conta criada com sucesso!");
    },
  });
};

export const useAccountBalance = (accountId) => {
  return useQuery({
    queryKey: ["account-balance", accountId],
    queryFn: async () => {
      const { data } = await client.get(`/accounts/${accountId}/balance`);
      return data;
    },
    enabled: !!accountId,
  });
};
