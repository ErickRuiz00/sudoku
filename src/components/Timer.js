import { useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ time }) {
  
  useEffect(() => {
    const timer = setInterval(() => {
      time.setSeconds((prevSeconds) => {
        if (prevSeconds < 59) return prevSeconds + 1;
        else {
          time.setMinutes((prevMinutes) => prevMinutes + 1);
          return (prevSeconds = 0);
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const formatTime = (time) => (time < 10 ? "0" + time : time + "");

  return (
    <div className={styles.timer}>
      {formatTime(time.minutes)}:{formatTime(time.seconds)}
    </div>
  );
}

export default Timer;
