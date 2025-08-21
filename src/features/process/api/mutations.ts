import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "../../../app/api/api.ts";
import { CLIENT_ID } from "../../../constants.ts";
import { IProcessStartDto } from "../types.ts";

export const useStartProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async (process: IProcessStartDto) => {
      const response = await api.post(`/process/start/${CLIENT_ID}`, process);
      return response; // Or response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process"] });
    },
  });

export const usePauseProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async () => {
      return await api.patch(`/process/pause/${CLIENT_ID}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process"] });
    },
  });

export const useResumeProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async () => {
      return await api.patch(`/process/resume/${CLIENT_ID}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process"] });
    },
  });

export const useExtendProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: () => api.patch(`/process/extend/${CLIENT_ID}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["process"] }),
  });

export const useFinishProcessMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: () => api.patch(`/process/finish/${CLIENT_ID}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["process"] }),
  });
