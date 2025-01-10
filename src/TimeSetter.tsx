// Define the props for the TimeSetter component
interface TimerSetterProps {
  time: number;
  setTime: (time: number) => void;
  min: number;
  max: number;
  interval: number;
  type: "break" | "session";
}

// TimeSetter component to adjust break and session lengths
const TimeSetter: React.FC<TimerSetterProps> = ({
  time,
  setTime,
  min,
  max,
  interval,
  type,
}) => {
  return (
    <div>
      {/* Button to decrement the time, only if above the minimum */}
      <button
        className="timesetter-btn"
        onClick={() => (time > min ? setTime(time - interval) : null)}
        id={`${type}-decrement`}
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <div className="front">
          <span>-</span>
        </div>
      </button>
      {/* Display the current time length */}
      <span id={`${type}-length`}> {time / interval} </span>
      {/* Button to increment the time, only if below the maximum */}
      <button
        className="timesetter-btn"
        onClick={() => (time < max ? setTime(time + interval) : null)}
        id={`${type}-increment`}
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <div className="front">
          <span>+</span>
        </div>
      </button>
    </div>
  );
};

export default TimeSetter;
