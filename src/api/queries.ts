import { useQuery } from "@tanstack/react-query";
import api from "./api.ts";
import { IProcess } from "../types/process.ts";

export const useProcessStatus = () =>
  useQuery<IProcess>({
    queryKey: ["process"],
    queryFn: async () => {
      const response = await api.get("/process/status");
      return response.data.data; // TODO: Improve endpoint management
    },
  });
