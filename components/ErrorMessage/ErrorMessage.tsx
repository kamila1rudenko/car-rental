import styles from "./ErrorMessage.module.css";

interface Props {
  text?: string;
}

export function ErrorMessage({ text = "Something went wrong" }: Props) {
  return <div className={styles.error}>{text}</div>;
}
