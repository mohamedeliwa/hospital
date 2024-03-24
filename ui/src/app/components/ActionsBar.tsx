'use client';

import styles from './ActionsBar.module.css';
import CreatePatientModal from './CreatePatientModal';
import CreateDecisionModal from './decisions/CreateDecisionModal';

const ActionsBar = () => {
  return (
    <div className={styles.description}>
      <CreatePatientModal />
      <CreateDecisionModal />
    </div>
  );
};

export default ActionsBar;
