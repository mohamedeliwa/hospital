'use client';

import { Button } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import styles from './ActionsBar.module.css';
import CreatePatientModal from './CreatePatientModal';

const ActionsBar = () => {
  return (
    <div className={styles.description}>
      <CreatePatientModal />
      <Button type="primary" icon={<FileAddOutlined />} size={'large'}>
        أضف قرار
      </Button>
    </div>
  );
};

export default ActionsBar;
