import styles from "./MessageNoCars.module.css";

export function MessageNoCars() {
  return (
    <div className={styles.wrapper}>
      <p>No cars found for selected filters.</p>
    </div>
  );
}
