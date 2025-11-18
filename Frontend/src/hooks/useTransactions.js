import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import { toast } from "react-toastify";

export const useTransactions = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.account_id) params.append("account_id", filters.account_id);
  if (filters.tipo_transacao) params.append("tipo_transacao", filters.tipo_transacao);
  if (filters.data_inicio) params.append("data_inicio", filters.data_inicio);
  if (filters.data_fim) params.append("data_fim", filters.data_fim);
  params.append("skip", filters.skip || 0);
  params.append("limit", filters.limit || 20);

  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const { data } = await client.get(`/transactions/?${params}`);
      return data;
    },
  });
};

export const useSaque = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/saque", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Saque realizado!");
    },
  });
};

export const useDeposito = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/deposito", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Depósito realizado!");
    },
  });
};

export const usePix = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/pix", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("PIX realizado!");
    },
  });
};

export const useTransferencia = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await client.post("/transactions/transferencia", transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      queryClient.invalidateQueries(["transactions"]);
      toast.success("Transferência realizada!");
    },
  });
};
