import styles from './page.module.scss';

/* eslint-disable-next-line */
export interface PerformReportProps {}

export default function PerformReport(props: PerformReportProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PerformReport!</h1>
    </div>
  );
}
