import React, { ReactElement, ReactNode, useState, useMemo, useEffect, useImperativeHandle } from 'react';
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
import { useSelector, useDispatch } from 'react-redux'
import { CHANGE_STEP, ADD_STORE_INFO } from '@/redux/type'
import Layout from 'antd/lib/layout/layout';
import _ from 'lodash'
import './index.less'


const { Option } = Select
interface Props {
  formList: Array<FormItem>;
  getFormData?: Function;
  isShowSubmitBtn?:boolean;
  placeholder?: any;
  layout?: any;
  formItemLayout?: any;
  submitText?: string;
  resetFn?: Function;
  initData?: any;
  cRef?:any;
  style?: any;
  specialBtn?: {
    btn: boolean;
    text: '添加' | '下一步';
  },
}

export default function StoreForm({
  formList,
  layout = 'horizontal',
  formItemLayout = {},
  style= {},
  submitText = '搜索',
  specialBtn,  //特别的按钮文字
  resetFn,
  getFormData,
  initData,
  placeholder,
  cRef,
  isShowSubmitBtn = true
}: Props): ReactElement {

  useImperativeHandle(cRef, () => ({
    resetData: () => resetData(),
  }))

  const storeInfo: any = useSelector((state: any) => state.storeInfo)
  const dispatch = useDispatch()

  const [form]: Array<any> = Form.useForm();
  const [fileList, setFileList] = useState<any[]>()

  const onFinish = _.debounce((value): void => {
    getFormData && getFormData(value)
  }, 1000);

  useEffect(() => {
    form.setFieldsValue(storeInfo)
  }, [storeInfo])

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
    const { type, placeholder, optionList, name, width, maxLength, onChange } = formItem;
    switch (type) {
      case 'password':
        return <Input.Password style={{width}} placeholder={placeholder} key={name + 'item'}/>;
      case 'switch':
        return <Switch defaultChecked  style={{width}}/>;
      case 'number':
        return <InputNumber style={{width}} min={0} step="0.01"/>;
      case 'checkbox':
        return <Checkbox.Group options={optionList} onChange={onChange}/>
      case 'textArea':
        return <Input.TextArea style={{width}} showCount maxLength={maxLength} allowClear/>;
      case 'select':
        return <Select style={{width: width || '100%'}} key={name + 'item'} allowClear>
                { optionList.map(option => {
                  const { value, label } = option
                  return <Option value={value} key={value}>{label}</Option>
                })} 
               </Select>
      default:
        return <Input style={{width}} placeholder={placeholder} allowClear key={name + 'item'}/>;
    }
  };

  const resetData = () => {
    form.resetFields()
    setFileList([])
    resetFn && resetFn()
  }

  const preStep = () => {
    dispatch({
      type: CHANGE_STEP,
      params: storeInfo.step - 1
    })
  }

  const nextStep = () => {
    form.validateFields().then(params => {
      dispatch({
        type: ADD_STORE_INFO,
        params
      })
      dispatch({
        type: CHANGE_STEP,
        params: storeInfo.step + 1
      })
    })
    
  }
  
  return (
    <Form 
        {...formItemLayout} 
        form={form} 
        onFinish={onFinish} 
        layout={layout}
        initialValues={initData}
        className='store_form'
    >
      <div className='form_main'>
        {formItem(formList)}
      </div>
        <div className="action" style={style}>
          <Space>
            {storeInfo.step > 0 && <Button onClick={preStep}>上一步</Button>}
            {storeInfo.step < 7 && <Button className='submitBtn' htmlType="submit" onClick={nextStep}>
                { submitText }
            </Button>}
            <Button onClick={resetData}>
                重置
            </Button>
          </Space>
        </div>
    </Form>
  );
}
