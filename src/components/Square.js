import styles from "./Square.module.css";
import { useState } from "react";

function Square({ number, isDisabled }) {
  const [value, setValue] = useState(number + "");

  const handleOnChange = (e) => {
    const eventNumber = e.target.value;
    var lastNumber = eventNumber.slice(-1);

    if (lastNumber >= "1" && lastNumber <= "9") setValue(lastNumber);

    if (eventNumber === "") setValue("");
  };

  return (
    <input
      type="text"
      value={value}
      className={`${styles.square}`}
      readOnly={isDisabled}
      onChange={(e) => handleOnChange(e)}
    />
  );
}

export default Square;
