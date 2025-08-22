import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socket from "../../../app/api/socket";
import {
  useExtendProcessMutation,
  useFinishProcessMutation,
  usePauseProcessMutation,
  useResumeProcessMutation,
  useStartProcessMutation,
} from "../api/mutations";
import { useProcessStatus } from "../api/queries";

const useProcessManager = (component: string, quantity: number) => {
  const queryClient = useQueryClient();

  const status = useProcessStatus();
  const startMutation = useStartProcessMutation(queryClient);
  const pauseMutation = usePauseProcessMutation(queryClient);
  const resumeMutation = useResumeProcessMutation(queryClient);
  const extendMutation = useExtendProcessMutation(queryClient);
  const finishMutation = useFinishProcessMutation(queryClient);

  useEffect(() => {
    socket.on("process-timeout", () => status.refetch());

    return () => {
      socket.off("process-timeout");
    };
  }, []);

  const start = () => startMutation.mutate({ component, quantity });
  const pause = () => pauseMutation.mutate();
  const resume = () => resumeMutation.mutate();
  const extend = () => extendMutation.mutate();
  const finish = () => finishMutation.mutate();

  return {
    status,
    start,
    pause,
    resume,
    extend,
    finish,
  };
};

export default useProcessManager;
