interface ITimeoutModalProps {
  onExtendProcess: () => void;
  onFinishProcess: () => void;
}

const TimeoutModal = ({ onExtendProcess, onFinishProcess}: ITimeoutModalProps) => {
  return (
    <div role="dialog" aria-labelledby="timeout-title" aria-describedby="timeout-message">
      <h2 id="timeout-title">Session Timeout</h2>
      <p id="timeout-message">Your session has expired. Would you like to extend it or finish the process?</p>
      <div>
        <button type="button" id="extend-button" onClick={() => onExtendProcess()}>
          Extend Session
        </button>
        <button type="button" id="finish-button" onClick={() => onFinishProcess()}>
          Finish Process
        </button>
      </div>
    </div>
  );
};

export default TimeoutModal;
