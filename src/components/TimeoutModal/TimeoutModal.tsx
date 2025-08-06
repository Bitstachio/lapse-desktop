import { useQueryClient } from "@tanstack/react-query";
import { useExtendProcessMutation, useFinishProcessMutation } from "../../api/mutations";

const TimeoutModal = () => {
  const queryClient = useQueryClient();
  const extendProcessMutation = useExtendProcessMutation(queryClient);
  const finishProcessMutation = useFinishProcessMutation(queryClient);

  return (
    <div role="dialog" aria-labelledby="timeout-title" aria-describedby="timeout-message">
      <h2 id="timeout-title">Session Timeout</h2>
      <p id="timeout-message">Your session has expired. Would you like to extend it or finish the process?</p>
      <div>
        <button type="button" id="extend-button" onClick={() => extendProcessMutation.mutate()}>
          Extend Session
        </button>
        <button type="button" id="finish-button" onClick={() => finishProcessMutation.mutate()}>
          Finish Process
        </button>
      </div>
    </div>
  );
};

export default TimeoutModal;
