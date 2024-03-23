'use client';

import { useCallback } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleFilled, DeleteOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface DeleteModalProps {
  //   objectName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const onDeletion = useCallback<(params: DeleteModalProps) => void>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_params) => {
      confirm({
        title: `متأكد من الحذف؟`,
        icon: <ExclamationCircleFilled style={{ color: 'red' }} />,
        content: 'هذا الإجراء لا يمكن التراجع عنه',
        async onOk() {
          try {
            return await new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            });
          } catch {
            return console.log('Oops errors!');
          }
        },
        onCancel() {},
      });
    },
    [],
  );
  return (
    <Button
      onClick={() => onDeletion(props)}
      type="default"
      danger
      icon={<DeleteOutlined />}
    />
  );
};

export default DeleteModal;
