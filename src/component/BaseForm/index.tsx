import React, { ReactElement, ReactNode, useState, useEffect, useImperativeHandle } from 'react';
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
import Upload from '../form/Upload'
import { FormItem } from '@/type';
import Layout from 'antd/lib/layout/layout';
import _ from 'lodash'


const { Option } = Select
interface Props {
  formList: Array<FormItem>;
  getFormData: Function;
  onClick?: () => void;
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
  nextStep?: () => void
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
  style= {},
  submitText = '搜索',
  specialBtn,  //特别的按钮文字
  nextStep,
  resetFn,
  getFormData,
  initData,
  placeholder,
  cRef,
  onClick,
  isShowSubmitBtn = true
}: Props): ReactElement {

  useImperativeHandle(cRef, () => ({
    resetData: () => resetData(),
  }))

  const [form]: Array<any> = Form.useForm();
  const [fileList, setFileList] = useState<any[]>()



  // useEffect(() => {
  //   let formItem = formList.find(item => item.type === 'upload')

  // }, [])

  const onFinish = _.debounce((value): void => {
    getFormData(value)
  }, 1000);

  const normFile = (e) => {
    // console.log(e)
  }

  const formItem = (formList): ReactNode =>
    formList.map((formItem, index) => {
      const { type, label, name, rules } = formItem;
      switch(type) {
        case 'upload':
           return(
              <Form.Item name={name} label={label} rules={rules} valuePropName="fileList" key={name} getValueFromEvent={normFile}>
                {getFormItem(formItem)}
              </Form.Item>
           ) 
        default:
          return (
              <Form.Item name={name} label={label} rules={rules} key={name}>
                {getFormItem(formItem)}
              </Form.Item>
          );
      }
      
    });

  const uploadChange = _.debounce((list, item) => {
    let { name } = item
    // list.push({
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // })
    setFileList(list)
    form.setFieldsValue({
      [name]: list.filter(item => item.status === 'done')
    })
  }, 500)

  const getFormItem = (formItem): ReactNode => {
    const { type, placeholder, optionList, name, width, maxLength } = formItem;
    switch (type) {
      case 'password':
        return <Input.Password style={{width}} placeholder={placeholder} key={name + 'item'}/>;
      case 'switch':
        return <Switch defaultChecked  style={{width}}/>;
      case 'number':
        return <InputNumber style={{width}} min={0} step="0.01"/>;
      case 'upload':
        return <Upload style={{width}} {...formItem} fileList={fileList} uploadChange={(list) => uploadChange(list, formItem)}/>;
        // return (
        //   // <Upload name="logo" action="/upload.do" listType="picture">
        //   //   <Button icon={<UploadOutlined />}>Click to upload</Button>
        //   // </Upload>
        // )
      case 'checkbox':
        return <Checkbox.Group options={optionList} />
      case 'textArea':
        return <Input.TextArea style={{width}} showCount maxLength={maxLength} allowClear/>;
      case 'select':
        return <Select style={{width: width || 200}} key={name + 'item'} allowClear>
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
  
  return (
    <Form 
        {...formItemLayout} 
        form={form} 
        onFinish={onFinish} 
        layout={layout}
        initialValues={initData}
    >
      {formItem(formList)}
        <div className="action" style={style}>
          <Space>
            {isShowSubmitBtn && <Button className='submitBtn' type="primary" htmlType="submit" onClick={onClick}>
                { submitText }
            </Button>}
            {specialBtn && specialBtn.btn &&<Button type="primary" onClick={nextStep}>
                {specialBtn.text}
            </Button>}
            {resetFn &&<Button type="primary" onClick={resetData}>
                重置
            </Button>}
          </Space>
        </div>
    </Form>
  );
}
