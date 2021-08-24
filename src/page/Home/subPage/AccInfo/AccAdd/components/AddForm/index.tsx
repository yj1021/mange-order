import React, { ReactElement, ReactNode } from 'react';
import { Form, Input, Button, Space, Select, Switch, InputNumber, Layout, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormItem } from '@/type'
import DelBtn from '@/component/button/DelBtn'
import './index.less'
import { type } from 'os';
import { format } from 'path';

const { Option } = Select;

interface Props {
    formList: any
}

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

export default function AddForm({
    formList
}: Props): ReactElement {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const onChange = (value, name) => {
    form.setFieldsValue({
        [name]: value
    })
  }

  const getFormItem = (formItem): ReactNode => {
    const { type, placeholder, optionList, name, width, maxLength, callBack } = formItem;
    switch (type) {
      case 'password':
        return <Input.Password style={{width}} placeholder={placeholder} key={name + 'item'}/>;
      case 'switch':
        return <Switch defaultChecked  style={{width}}/>;
      case 'number':
        return <InputNumber style={{width}} min={0} step="0.01"/>;
      case 'textArea':
        return <Input.TextArea style={{width}} showCount maxLength={maxLength} allowClear/>;
      case 'select':
        return <Select style={{width: width || 200}} key={name + 'item'} allowClear onChange={(val) => {onChange(val, name); callBack(val)}}>
                { optionList.map(option => {
                  const { value, label } = option
                  return <Option value={value} key={value}>{label}</Option>
                })} 
               </Select>
      default:
        return <Input style={{width}} placeholder={placeholder} allowClear key={name + 'item'}/>;
    }
  };

  return (
    <Form form={form} className='form_acc_add' name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="accInfoList">
        {(fields, { add, remove }) => {
            let len = fields.length
            return (
                <>
                    {fields.map((field, index) => (
                        <>
                            <div className='formHeader'>
                                <span>第{ index + 1 }个:</span>
                                <DelBtn text={`确定删除第${index + 1}受益人吗？`} confirm={() => remove(field.name)} />
                            </div>
                            <div className='formItem_body'>
                                {formList.map(item => {
                                    let { label, name, rules } = item
                                    return (
                                        <>
                                            <Form.Item
                                                {...field}
                                                label={label}
                                                name={[field.name, name]}
                                                fieldKey={[field.fieldKey, name]}
                                                rules={rules}
                                            >
                                                { getFormItem(item) }
                                            </Form.Item>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) 
                    )}
                    <Form.Item className={len < 1 ? 'initActive' : 'form_action'}>
                        <Space align="center">
                            <Button type="dashed" onClick={() => {
                                form.validateFields().then(res => {
                                    add()
                                }).catch(e => {
                                  notification.warning({
                                    message: '添加提醒',
                                    description: '请正确完善信息后添加'
                                  })
                                })
                            }}>
                               添加
                            </Button>
                            {len > 0 && <Button type="primary" htmlType="submit">
                                提交
                            </Button>}
                        </Space>
                    </Form.Item>
                </>
            )
        }}
      </Form.List>
    </Form>
  );
}
