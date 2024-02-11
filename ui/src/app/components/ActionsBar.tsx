'use client';

import { Button } from 'antd';
import { UserAddOutlined, FileAddOutlined } from '@ant-design/icons';
import styles from './ActionsBar.module.css';

const ActionsBar = () => {
  return (
    <div className={styles.description}>
      <Button type="primary" icon={<UserAddOutlined />} size={'large'}>
        أضف مريض
      </Button>
      <Button type="primary" icon={<FileAddOutlined />} size={'large'}>
        أضف قرار
      </Button>
    </div>
  );
};

export default ActionsBar;
