'use client';

import { useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import { Form, Input, type FormInstance, DatePicker } from 'antd';

export interface EditDecisionFormValues {
  serialNumber?: string;
  issuedAt?: Dayjs;
  expirationDate?: Dayjs;
}

interface EditDecisionFormProps {
  initialValues: EditDecisionFormValues;
  onFormInstanceReady: (instance: FormInstance<EditDecisionFormValues>) => void;
}

const EditDecisionForm: React.FC<EditDecisionFormProps> = ({
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
        name="serialNumber"
        label="رقم القرار"
        rules={[
          { required: true, message: 'إلزامي' },
          { pattern: /^\d+$/, message: 'أدخل رقم صحيح' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="issuedAt"
        label="تاريخ الصدور"
        rules={[{ required: true, message: 'تاريخ الصدور إجبارى' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="expirationDate"
        label="تاريخ الإنتهاء"
        rules={[{ required: true, message: 'تاريخ الإنتهاء إجبارى' }]}
      >
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

export default EditDecisionForm;
