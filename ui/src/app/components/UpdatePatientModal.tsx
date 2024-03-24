'use client';

import { useState } from 'react';
import { Button, FormInstance, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CreatePatientForm, {
  CreatePatientFormValues,
} from './CreatePatientForm';

const UpdatePatientModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreate = (values: CreatePatientFormValues) => {
    console.log('Received values of form: ', values);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} type="default" icon={<EditOutlined />} />
      <Modal
        title="Create a Patient"
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
        <CreatePatientForm
          initialValues={{
            name: 'aaa',
            phone: '01023456789',
            nationalId: '01234567891234',
          }}
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          }}
        />
      </Modal>
    </>
  );
};

export default UpdatePatientModal;
