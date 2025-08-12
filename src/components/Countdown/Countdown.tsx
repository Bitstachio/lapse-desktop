import useCountdown from "../../hooks/useCountdown";

interface ICountdownProps {
  initialDuration: number | undefined;
  isRunning: boolean;
}

const Countdown = ({ initialDuration, isRunning }: ICountdownProps) => {
  const { formattedTime } = useCountdown(isRunning, initialDuration);

  return (
    <p aria-live="polite" role="status">
      {formattedTime}
    </p>
  );
};

export default Countdown;
