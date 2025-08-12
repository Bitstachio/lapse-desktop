import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  useExtendProcessMutation,
  useFinishProcessMutation,
  usePauseProcessMutation,
  useResumeProcessMutation,
  useStartProcessMutation,
} from "../api/mutations";
import { useProcessStatus } from "../api/queries";
import socket from "../api/socket";
import { TProcessState } from "../types/process";

const useProcessManager = (component: string, quantity: number) => {
  const [state, setState] = useState<TProcessState>("inactive");

  const queryClient = useQueryClient();

  const status = useProcessStatus();
  const startMutation = useStartProcessMutation(queryClient);
  const pauseMutation = usePauseProcessMutation(queryClient);
  const resumeMutation = useResumeProcessMutation(queryClient);
  const extendMutation = useExtendProcessMutation(queryClient);
  const finishMutation = useFinishProcessMutation(queryClient);

  useEffect(() => {
    socket.on("process-timeout", (data) => {
      if (data.type === "PROCESS_TIMEOUT") {
        setState("timeout");
      } else {
        // data.type === "EXTENSION_TIMEOUT"
        setState("inactive");
      }
    });

    return () => {
      socket.off("process-timeout");
    };
  }, []);

  const start = () => {
    startMutation.mutate({ component, quantity });
    setState("running");
  };

  const pause = () => {
    pauseMutation.mutate();
    setState("paused");
  };

  const resume = () => {
    resumeMutation.mutate();
    setState("running");
  };

  const extend = () => {
    extendMutation.mutate();
    setState("running");
  };

  const finish = () => {
    finishMutation.mutate();
    setState("inactive");
  };

  return {
    state,
    status,
    start,
    pause,
    resume,
    extend,
    finish,
  };
};

export default useProcessManager;
