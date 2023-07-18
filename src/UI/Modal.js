import ReactDOM from "react-dom";
import Button from "./Button";
import Card from "./Card";
import styles from "./Modal.module.css";

function Backdrop(props) {
  return <div onClick={props.onDiscard} className={styles.backdrop}></div>;
}

function Overlay(props) {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>

      <div className={styles.content}>
        {props.children}
        <p>{props.message}</p>
      </div>

      <footer className={styles.actions}>
        <Button onClick={props.onConfirm}>{props.buttonText}</Button>
        <Button onClick={props.onDiscard}>Close</Button>
      </footer>
    </Card>
  );
}

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onDiscard={props.onDiscard} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onDiscard={props.onDiscard}
          buttonText={props.buttonConfirmText}
        >
          {props.children}
        </Overlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default Modal;
