import { useState, useEffect } from "react";
import AlarmSound from "./assets/AlarmSound.mp3";
import "./App.css";
import { DisplayState } from "./helpers";
import TimeSetter from "./TimeSetter";
import Display from "./Display";

// Default times for break and session in seconds
const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60; // Minimum time in seconds (1 minute)
const max = 60 * 60; // Maximum time in seconds (60 minutes)
const interval = 60; // Interval for increment/decrement in seconds (1 minute)

function App() {
  // State for break time, session time, and display state
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  // Effect to handle the timer countdown
  useEffect(() => {
    let timerID: number;
    // If the timer is not running, do nothing
    if (!displayState.timerRunning) return;

    // If the timer is running, set an interval to decrement the time every second
    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    // Clear the interval when the component unmounts or timer stops
    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  // Effect to handle the timer reaching zero
  useEffect(() => {
    // When the time reaches zero, play the alarm sound and switch the timer type
    if (displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 2; // Set the audio start time
      audio.play().catch((err) => console.log(err)); // Play the audio
      setDisplayState((prev) => ({
        ...prev,
        // Switch the timer type and reset the time
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  // Function to reset the timer and states
  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause(); // Pause the audio
    audio.currentTime = 0; // Reset the audio time
  };

  // Function to start or stop the timer
  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning, // Toggle the timer running state
    }));
  };

  // Function to change the break time
  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return; // Do nothing if the timer is running
    setBreakTime(time);
  };

  // Function to decrement the display time
  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1, // Decrement the time by 1 second
    }));
  };

  // Function to change the session time
  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return; // Do nothing if the timer is running
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <div className="clock">
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label">Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id="beep" src={AlarmSound} />
    </div>
  );
}

export default App;
