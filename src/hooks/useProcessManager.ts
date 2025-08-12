import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useExtendProcessMutation,
  useFinishProcessMutation,
  usePauseProcessMutation,
  useResumeProcessMutation,
  useStartProcessMutation,
} from "../api/mutations";
import { useProcessStatus } from "../api/queries";

const useProcessManager = (component: string, quantity: number) => {
  const [isRunning, setIsRunning] = useState(false);

  const queryClient = useQueryClient();

  const status = useProcessStatus();
  const startMutation = useStartProcessMutation(queryClient);
  const pauseMutation = usePauseProcessMutation(queryClient);
  const resumeMutation = useResumeProcessMutation(queryClient);
  const extendMutation = useExtendProcessMutation(queryClient);
  const finishMutation = useFinishProcessMutation(queryClient);

  const start = () => {
    startMutation.mutate({ component, quantity });
    setIsRunning(true);
  };

  const pause = () => {
    pauseMutation.mutate();
    setIsRunning(false);
  };

  const resume = () => {
    resumeMutation.mutate();
    setIsRunning(true);
  };

  const extend = () => {
    extendMutation.mutate();
  };

  const finish = () => {
    finishMutation.mutate();
    setIsRunning(false);
  };

  return {
    isRunning,
    status,
    start,
    pause,
    resume,
    extend,
    finish,
  };
};

export default useProcessManager;
