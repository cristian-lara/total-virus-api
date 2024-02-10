import styles from './page.module.scss';

/* eslint-disable-next-line */
export interface ConsultAnalysisProps {}

export default function ConsultAnalysis(props: ConsultAnalysisProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ConsultAnalysis!</h1>
    </div>
  );
}
