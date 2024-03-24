import styles from './page.module.css';
import ActionsBar from '../components/ActionsBar';
// import PatientsTable from '../components/PatientsTable';
import DecisionsTable from '../components/decisions/DecisionsTable';

export default function Home() {
  return (
    <main className={styles.main}>
      <ActionsBar />

      <div className={styles.center}>
        {/* <PatientsTable /> */}
        <DecisionsTable />
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
