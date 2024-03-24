'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, FormInstance, Modal } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import EditDecisionForm, { EditDecisionFormValues } from './EditDecisionForm';

interface CreateDecisionModalProps {}

const CreateDecisionModal: React.FC<CreateDecisionModalProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreate = (values: EditDecisionFormValues) => {
    console.log('Received values of form: ', {
      ...values,
      issuedAt: values?.issuedAt?.toISOString(),
      expirationDate: values?.expirationDate?.toISOString(),
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        icon={<FileAddOutlined />}
        size={'large'}
      >
        أضف قرار
      </Button>
      <Modal
        title="Create a Decision"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true }}
        destroyOnClose
        onOk={async () => {
          try {
            const values = await formInstance?.validateFields();
            formInstance?.resetFields();
            onCreate(values);
          } catch (error) {
            console.log('Failed:', error);
          }
        }}
      >
        <EditDecisionForm
          initialValues={{
            serialNumber: '13256',
            issuedAt: dayjs(),
            expirationDate: dayjs(),
          }}
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          }}
        />
      </Modal>
    </>
  );
};

export default CreateDecisionModal;
