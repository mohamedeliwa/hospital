import React from 'react';
import { Button } from 'antd';
import { UserAddOutlined, DiffOutlined } from '@ant-design/icons';
import styles from '../page.module.css';

const ActionsBar = () => {
  return (
    <div className={styles.description}>
      <Button type="primary" icon={<UserAddOutlined />} size={'large'}>
        أضف مريض
      </Button>
      <Button type="primary" icon={<DiffOutlined />} size={'large'}>
        أضف قرار
      </Button>
    </div>
  );
};

export default ActionsBar;
