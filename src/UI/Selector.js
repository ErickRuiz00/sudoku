import { useState } from "react";
import styles from "./Selector.module.css"

function Selector(props) {

    const [selectedButton,setSelectedButton] = useState(1);
    
    const changeSelectedButton = (buttonIdx) => {
        setSelectedButton(buttonIdx);
        props.onChangeSelection(buttonIdx);
    };

    return (
        <div className={styles.selector}>
            <button className={`${styles.button} ${selectedButton === 0 && styles.selected}`} onClick={() => changeSelectedButton(0)}>Easy</button>
            <button className={`${styles.button} ${selectedButton === 1 && styles.selected}`} onClick={() => changeSelectedButton(1)}>Medium</button>
            <button className={`${styles.button} ${selectedButton === 2 && styles.selected}`} onClick={() => changeSelectedButton(2)}>Hard</button>
        </div>
    );
}

export default Selector;