import { useQuery } from "@tanstack/react-query";
import api from "./api.ts";

export const useProcessStatus = () =>
  useQuery({
    queryKey: ["process"],
    queryFn: async () => {
      const response = await api.get("/process/status");
      return response.data.data; // TODO: Improve endpoint management
    },
  });
