import { QueryClient, useMutation } from "@tanstack/react-query";
import { IProcessStartDto } from "../../features/process/types.ts";
import api from "./api.ts";

export const useStartProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async (process: IProcessStartDto) => {
      const response = await api.post("/process/start", process);
      return response; // Or response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process"] });
    },
  });

export const usePauseProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async () => {
      return await api.patch("/process/pause");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process"] });
    },
  });

export const useResumeProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async () => {
      return await api.patch("/process/resume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process"] });
    },
  });

export const useExtendProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: () => api.patch("/process/extend"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["process"] }),
  });

export const useFinishProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: () => api.patch("/process/finish"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["process"] }),
  });
