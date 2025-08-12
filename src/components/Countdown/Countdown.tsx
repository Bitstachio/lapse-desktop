import useCountdown from "../../hooks/useCountdown";

interface ICountdownProps {
  startingDuration: number | undefined;
  isRunning: boolean;
}

const Countdown = ({ startingDuration, isRunning }: ICountdownProps) => {
  const { formattedTime } = useCountdown(isRunning, startingDuration);

  return (
    <p aria-live="polite" role="status">
      {formattedTime}
    </p>
  );
};

export default Countdown;
