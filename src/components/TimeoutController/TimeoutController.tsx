interface ITimeoutControllerProps {
  onExtend: () => void;
  onFinish: () => void;
}

const TimeoutController = ({ onExtend, onFinish }: ITimeoutControllerProps) => (
  <div role="group" aria-label="Timeout controls">
    <button type="button" onClick={onExtend}>
      Extend
    </button>
    <button type="button" onClick={onFinish}>
      Finish
    </button>
  </div>
);

export default TimeoutController;
