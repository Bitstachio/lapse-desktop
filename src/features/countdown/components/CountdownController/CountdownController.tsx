import { TProcessState } from "../../../process/types";

interface ICountdownControllerProps {
  state: TProcessState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
}

const CountdownController = ({ state, onStart, onPause, onResume }: ICountdownControllerProps) => (
  <div role="group" aria-label="Timer controls">
    {state === "inactive" ? (
      <button type="button" onClick={onStart}>
        Start
      </button>
    ) : state === "running" ? (
      <button type="button" onClick={onPause}>
        Pause
      </button>
    ) : (
      state === "paused" && (
        <button type="button" onClick={onResume}>
          Resume
        </button>
      )
    )}
  </div>
);

export default CountdownController;
