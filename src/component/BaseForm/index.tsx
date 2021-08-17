import React, { ReactElement, ReactNode } from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { FormItem } from '@/type';
import Layout from 'antd/lib/layout/layout';


const { Option } = Select
interface Props {
  formList: Array<FormItem>;
  getFormData: Function;
  placeholder?: any;
  layout?: any;
  formItemLayout?: any;
  submitText?: string;
  resetFn?: Function;
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
    const { type, placeholder, optionList, name } = formItem;
    switch (type) {
      case 'password':
        return <Input.Password placeholder={placeholder} key={name + 'item'}/>;
      case 'select':
        return <Select style={{width: 200}} key={name + 'item'} allowClear>
                { optionList.map(option => {
                  const { name, label } = option
                  return <Option value={name} key={name}>{label}</Option>
                })} 
               </Select>
      default:
        return <Input placeholder={placeholder} allowClear key={name + 'item'}/>;
    }
  };

  const resetData = () => {
    form.resetFields()
    resetFn()
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
