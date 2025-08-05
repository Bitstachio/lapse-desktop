import { QueryClient, useMutation } from "@tanstack/react-query";
import { IProcessStartDto } from "../types/process.ts";
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
