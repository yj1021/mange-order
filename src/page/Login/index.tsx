import React, { ReactElement } from 'react';
import BaseForm from '@/component/BaseForm/index';
import { usernameRegs, pwdRegs, requiredRegs } from '@/utils/regs';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { USERINFO } from '@/redux/type'
import './index.less'
// import { validator } from '@/utils/tool'

interface Props {}

export default function Login({}: Props): ReactElement {

    const history = useHistory()
    const dispatch = useDispatch()

  const userValidator = (rule, value, callback) => {
    const { rules, farmat } = usernameRegs;
    if(!value) {
        return Promise.reject('请输入用户名')
    }
    if (rules.test(value)) {
      return Promise.resolve();
      // callback()
    } else {
      return Promise.reject(farmat);
      // callback(farmat)
    }
  };

  const formList = [
    {
      type: 'text',
      name: 'username',
      label: '用户名',
      rules: [
        { ...requiredRegs },
        { validator: userValidator, validateTrigger: 'blur' },
      ],
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      name: 'pwd',
      label: '密码',
      rules: [{ ...requiredRegs, message: '请输入密码' }],
      placeholder: '请输入密码'
    },
  ];

  const getFormData = val => {
      let { username, pwd } = val
      if(username === 'admin' && pwd === '123') {
        sessionStorage.userInfo = JSON.stringify({
            username,
            pwd
        })
        dispatch({
            type: USERINFO,
            format: {
                username,
                token: 'dahsidhas21iodaisjdoandansdas'
            }
        })
        history.push('/main')
      }
  };

  return (
    <div className='login'>
      <BaseForm formList={formList} getFormData={getFormData} submitText='登陆' resetFn={() => {}}/>
    </div>
  );
}
