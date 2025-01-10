// Interface to define the state of the display
export interface DisplayState {
  // Time remaining in seconds
  time: number;
  // Type of timer, either "Session" or "Break"
  timeType: "Session" | "Break";
  // Boolean to indicate if the timer is running
  timerRunning: boolean;
}

// Function to format time in mm:ss format
export const formatTime = (time: number): string => {
  // Calculate minutes from the total time in seconds
  const minutes = Math.floor(time / 60);
  // Calculate remaining seconds
  const seconds = time % 60;
  // Return formatted time string with leading zeros if necessary
  return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
    seconds < 10 ? "0" + seconds.toString() : seconds
  }`;
};
