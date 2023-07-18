import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ time, gameCompleted }) {
  const [stopTimerHandler, setStopTimerHandler] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      time.setSeconds((prevSeconds) => {
        if (prevSeconds < 59) return prevSeconds + 1;

        time.setMinutes((prevMinutes) => prevMinutes + 1);
        return (prevSeconds = 0);
        
      });
    }, 1000);
    setStopTimerHandler(timer);

    return () => {
      clearInterval(timer);
    };
  }, [time.seconds]);

  if (gameCompleted) clearInterval(stopTimerHandler);

  return (
    <div className={styles.timer}>
      {time.formatTime(time.minutes)}:{time.formatTime(time.seconds)}
    </div>
  );
}

export default Timer;
