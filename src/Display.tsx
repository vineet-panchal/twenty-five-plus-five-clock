import { DisplayState, formatTime } from "./helpers";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";

// Define the props for the Display component
interface DisplayProps {
  displayState: DisplayState;
  reset: () => void;
  startStop: (displayState: DisplayState) => void;
}

// Display component to show the timer and control buttons
const Display: React.FC<DisplayProps> = ({
  displayState,
  reset,
  startStop,
}) => {
  return (
    <div className="display">
      {/* Display the current timer type (Session/Break) */}
      <h4 id="timer-label">{displayState.timeType}</h4>
      {/* Display the formatted time left, change color based on timer running state */}
      <span
        id="time-left"
        style={{ color: `${displayState.timerRunning ? "red" : "white"}` }}
      >
        {formatTime(displayState.time)}
      </span>
      <div>
        {/* Button to start or stop the timer */}
        <button
          className="display-btn"
          id="start_stop"
          onClick={() => startStop(displayState)}
        >
          <span className="shadow"></span>
          <span className="edge"></span>
          <div className="front">
            <span>{displayState.timerRunning ? <FaPause /> : <FaPlay />}</span>
          </div>
        </button>
        {/* Button to reset the timer */}
        <button
          className="display-btn"
          id="reset"
          onClick={reset}
        >
          <span className="shadow"></span>
          <span className="edge"></span>
          <div className="front">
            <span><FaUndo /></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Display;
