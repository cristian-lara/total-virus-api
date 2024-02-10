import styles from './page.module.scss';

/* eslint-disable-next-line */
export interface GetAnalizysProps {}

export default function GetAnalizys(props: GetAnalizysProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to GetAnalizys!</h1>
    </div>
  );
}
