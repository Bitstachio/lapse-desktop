import { useQuery } from "@tanstack/react-query";
import { IProcess } from "../types.ts";
import api from "../../../app/api/api.ts";

export const useProcessStatus = () =>
  useQuery<IProcess>({
    queryKey: ["process"],
    queryFn: async () => {
      const response = await api.get("/process/status");
      return response.data.data; // TODO: Improve endpoint management
    },
  });
