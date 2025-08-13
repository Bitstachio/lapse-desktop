import { TProcessState } from "../../types/process";

interface ICountdownControllerProps {
  state: TProcessState;
  onPause: () => void;
  onResume: () => void;
}

const CountdownController = ({ state, onPause, onResume }: ICountdownControllerProps) => (
  <div role="group" aria-label="Timer controls">
    {state === "running" ? (
      <button type="button" onClick={onPause}>
        Pause
      </button>
    ) : (
      <button type="button" onClick={onResume}>
        Resume
      </button>
    )}
  </div>
);

export default CountdownController;
