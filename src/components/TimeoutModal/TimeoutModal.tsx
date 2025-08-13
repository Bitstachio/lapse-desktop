import TimeoutController from "../TimeoutController/TimeoutController";

interface ITimeoutModalProps {
  onExtend: () => void;
  onFinish: () => void;
}

const TimeoutModal = ({ onExtend, onFinish }: ITimeoutModalProps) => {
  return (
    <div role="dialog" aria-labelledby="timeout-title" aria-describedby="timeout-message">
      <h2 id="timeout-title">Session Timeout</h2>
      <p id="timeout-message">Your session has expired. Would you like to extend it or finish the process?</p>
      <TimeoutController onExtend={onExtend} onFinish={onFinish} />
    </div>
  );
};

export default TimeoutModal;
