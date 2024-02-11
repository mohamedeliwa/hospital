import Image from 'next/image';
import styles from './page.module.css';

import ActionsBar from '../components/ActionsBar';
import PatientsTable from '../components/PatientsTable';
import DecisionsTable from '../components/DecisionsTable';

export default function Home() {
  return (
    <main className={styles.main}>
      <ActionsBar />

      <div className={styles.center}>
        <PatientsTable />
        <DecisionsTable />
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
