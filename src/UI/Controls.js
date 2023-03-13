import styles from "./Controls.module.css";
import Button from "./Button";

function Controls() {
    return (
        <div className={styles.controls}>
            <Button>New Game</Button>
            <Button>Solve</Button>
        </div>
    );
}

export default Controls;