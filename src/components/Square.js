import styles from "./Square.module.css"

function Square({ number, isDisabled }) {
    if (isDisabled) {
        return (
            <div className={styles.squareContainer}>
                <input type="number" value={number} className={styles.square} readOnly />
            </div>
        )
    }

    return (
        <div className={styles.squareContainer}>
            <input type="number" value={number} className={styles.square}/>
        </div>
    );
}

export default Square;