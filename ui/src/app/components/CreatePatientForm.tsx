/**
 * used to create and update patients
 */

'use client';

import { useEffect } from 'react';
import { Form, Input, type FormInstance } from 'antd';

export interface CreatePatientFormValues {
  name?: string;
  phone?: string;
  nationalId?: string;
}

interface CreatePatientFormProps {
  initialValues: CreatePatientFormValues;
  onFormInstanceReady: (
    instance: FormInstance<CreatePatientFormValues>,
  ) => void;
}

const CreatePatientForm: React.FC<CreatePatientFormProps> = ({
  initialValues,
  onFormInstanceReady,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    onFormInstanceReady(form);
  }, [form, onFormInstanceReady]);

  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="الإسم"
        rules={[
          { required: true, message: 'الإسم إجبارى' },
          // regex to match arabic alphabet with spaces only
          // \u0621-\u064A\u0660-\u0669 are ranges of unicode format of arabic letters
          { pattern: /^[\u0621-\u064A\u0660-\u0669 ]*$/, message: 'error' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="nationalId"
        label="الرقم القومى"
        rules={[
          { required: true, message: 'الرقم القومى إجبارى' },
          {
            validator: async (_, value: string) => {
              if (value.match(/^\d{14}$/)) return Promise.resolve();
              return Promise.reject();
            },
            message: 'أدخل رقم قومي صحيح',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="رقم التيليفون"
        rules={[
          { required: true, message: 'رقم التيليفون إجبارى' },
          {
            validator: async (_, value: string) => {
              if (value.match(/^01\d{9}$/)) return Promise.resolve();
              return Promise.reject();
            },
            message: 'أدخل رقم تيليفون صحيح',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default CreatePatientForm;
