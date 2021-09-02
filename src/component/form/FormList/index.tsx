import React, { ReactElement, ReactNode } from 'react'
import { 
    Form, 
    Input, 
    Button, 
    Space, 
    Select, 
    Switch, 
    InputNumber,
    Checkbox
  } from 'antd';
  import { FormItem } from '@/type';

  const { Option } = Select

interface Props {
    formList: FormItem[];
}

export default function index({
    formList
}: Props): ReactElement {

    const formItem = (formList): ReactNode =>
        formList.map((formItem, index) => {
        const { type, label, name, rules } = formItem;
        switch(type) {
            default:
            return (
                <Form.Item name={name} label={label} rules={rules} key={name}>
                    {getFormItem(formItem)}
                </Form.Item>
            );
        }
      
    });

    const getFormItem = (formItem): ReactNode => {
        const { type, placeholder, optionList, name, width, maxLength, onChange, disabled, defaultValue } = formItem;
        switch (type) {
          case 'password':
            return <Input.Password style={{width}} placeholder={placeholder} key={name + 'item'}/>;
          case 'switch':
            return <Switch defaultChecked  style={{width}}/>;
          case 'number':
            return <InputNumber disabled={disabled} style={{width}} min={0} step="0.01"/>;
          case 'checkbox':
            return <Checkbox.Group options={optionList} onChange={onChange}/>
          case 'textArea':
            return <Input.TextArea style={{width}} showCount maxLength={maxLength} allowClear/>;
          case 'select':
            return <Select style={{width: width || '100%'}} key={name + 'item'} allowClear onChange={onChange}>
                    { optionList.map(option => {
                      const { value, label } = option
                      return <Option value={value} key={value}>{label}</Option>
                    })} 
                   </Select>
          default:
            return <Input style={{width}} disabled={disabled} placeholder={placeholder} allowClear key={name + 'item'}/>;
        }
      };

    return (
        <>
            {formItem(formList)}
        </>
    )
}
