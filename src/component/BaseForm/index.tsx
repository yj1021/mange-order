import React, { ReactElement, ReactNode } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { FormItem } from '@/type';
import Layout from 'antd/lib/layout/layout';

interface Props {
  formList: Array<FormItem>;
  placeholder?: any;
  layout?: any;
  formItemLayout?: any;
  submitText?: string;
  resetFn?: Function;
  getFormData: Function;
  initData?: any;
}

export default function BaseForm({
  formList,
  layout = 'horizontal',
  formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 6 },
    },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 8 },
    // },
  },
  submitText = '搜索',
  resetFn,
  getFormData,
  initData,
  placeholder
}: Props): ReactElement {
  const [form]: Array<any> = Form.useForm();

  const onFinish = (value): void => {
    getFormData(value)
  };

  const formItem = (formList): ReactNode =>
    formList.map(formItem => {
      const { type, label, name, rules } = formItem;
      return (
        <Form.Item name={name} label={label} rules={rules} key={name}>
          {getFormItem(formItem)}
        </Form.Item>
      );
    });

  const getFormItem = (formItem): ReactNode => {
    const { type, placeholder } = formItem;
    switch (type) {
      case 'password':
        return <Input.Password placeholder={placeholder} />;
      default:
        return <Input placeholder={placeholder} allowClear />;
    }
  };

  const resetData = () => {
    form.resetFields()
  }

  return (
    <Form 
        {...formItemLayout} 
        form={form} 
        onFinish={onFinish} 
        layout={layout}
        initialValues={initData}
    >
      {formItem(formList)}
      <Form.Item
        wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 6 },
        }}
      >
        <Space>
            <Button type="primary" htmlType="submit">
                { submitText }
            </Button>
            {resetFn &&<Button type="primary" onClick={resetData}>
                重置
            </Button>}
        </Space>
      </Form.Item>
    </Form>
  );
}
