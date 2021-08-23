import React, { ReactElement, useState } from 'react';
import BaseForm from '@/component/BaseForm/index';
import ChangeForm from '@/component/form/ChangeForm'
import { FormItem } from '@/type';
import { requiredRegs, usernameRegs, pwdRegs } from '@/utils/regs'
import { useSelector, useDispatch } from 'react-redux'
import { USERINFO } from '@/redux/type'
import { USER_ROLE } from '@/contants/contants'

interface Props {
    
}

export default function AccChange({}: Props): ReactElement {

    const dispatch = useDispatch()
    const userInfo = useSelector((state: any) => state.userInfo)

    const [initData, setInitData] = useState({
        username: userInfo.username,
        pwd: '',
        surePwd: '',
        role: userInfo.role
    })

    const userValidata = (rule, value) => {
        let { rules, farmat } = usernameRegs
        if(!value) {
            return Promise.reject('请输入账号')
        }

        if(!rules.test(value)) {
            return Promise.reject(farmat)
        }

        return Promise.resolve()
    }

    const pwdValidata = (rule, value) => {
        let { rules, farmat } = pwdRegs
        if(!value) {
            return Promise.reject('请输入密码')
        }

        if(!rules.test(value)) {
            return Promise.reject(farmat)
        }

        return Promise.resolve()
    }

    const formList: FormItem[] = [
        {
            type: 'text',
            label: '账号',
            name: 'username',
            width: 200,
            rules: [
                {...requiredRegs},
                {validator: userValidata, validateTrigger: 'blur'}
            ]
        },
        {
            type: 'password',
            label: '密码',
            name: 'pwd',
            width: 200,
            rules: [
                {...requiredRegs},
                {validator: pwdValidata, validateTrigger: 'blur'}
            ]
        },
        {
            type: 'password',
            label: '确认密码',
            name: 'surePwd',
            width: 200,
            rules: [
                {...requiredRegs},
                ({ getFieldValue }) => ({
                    validator(_, value){
                        if(!value) {
                            return Promise.reject('请输入密码')
                        }
                        if(value !== getFieldValue('pwd')) {
                            return Promise.reject('两次输入密码不一致')
                        }

                        return Promise.resolve()
                    }
                    , validateTrigger: 'blur'
                }),
            ]
        },
        {
            type: 'select',
            label: '角色类型',
            name: 'role',
            optionList: USER_ROLE,
            width: 200,
            rules: [
                {...requiredRegs, message: '请选择角色类型'},
            ]
        },
    ] 

    const getFormData = ({username, role}) => {
        dispatch({
            type: USERINFO,
            format: {
                username,
                role
            }
        })
    }
    return (
        <>
            <BaseForm 
                formList={formList} 
                getFormData={getFormData} 
                resetFn={() => {}} 
                initData={initData}
                submitText='提交'
                style={{ marginLeft: 320 }}
            />
        </>
    )
}
