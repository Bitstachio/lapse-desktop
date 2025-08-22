import { useQuery } from "@tanstack/react-query";
import api from "../../../app/api/api.ts";
import { CLIENT_ID } from "../../../constants.ts";
import { IProcess } from "../types.ts";

export const useProcessStatus = () =>
  useQuery<IProcess | null>({
    queryKey: ["process"],
    queryFn: async () => {
      const response = await api.get(`/process/status/${CLIENT_ID}`);
      return response.data.data; // TODO: Improve endpoint management
    },
  });
