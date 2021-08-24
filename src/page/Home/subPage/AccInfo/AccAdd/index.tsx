import React, { ReactElement, useState } from 'react'
import { Button, Radio } from 'antd';
import BaseForm from '@/component/BaseForm/index';
import ChangeForm from '@/component/form/ChangeForm'
import AddForm from './components/AddForm'
import { CARD_TYPE, DARE_TYPE } from '@/contants/contants'
import { requiredRegs, IDRegs } from '@/utils/regs'
import { FormItem } from '@/type'
import _ from 'lodash'
import './index.less'

interface Props {
    
}



export default function AccAdd({}: Props): ReactElement {

    const [timeType, setTimeType] = useState('year')
    const [isRequired, setIsRequired] = useState(true)
    const [idDesc, setIdDesc] = useState('身份证')
    
    const onChangeCardType = (val) => {
        let item = CARD_TYPE.find(item => item.value === val)
        setIdDesc(item.label)
        setIsRequired(val === '0')
    }

    const formList = [
        {
            type: 'text',
            name: 'name',
            label: '姓名',
            // width: 300,
            rules: [
                {...requiredRegs, message: '姓名必填'}
            ]
        },
        {
            type: 'select',
            name: 'cardType',
            label: '身份证类型',
            optionList: CARD_TYPE,
            // width: 300,
            rules: [
                {...requiredRegs, message: '身份证类型必填'}
            ],
            callBack: (val) => onChangeCardType(val)
        },
        {
            type: 'text',
            name: 'cardNum',
            label: idDesc + '号码',
            // width: 300,
            rules: [
                {...requiredRegs, required: isRequired},
                ({ getFieldValue, getFieldsValue }) => ({
                    validator(_, value){
                        if(!isRequired) return Promise.resolve()
                        let { rules, message } = IDRegs
                        if(!value) {
                            return Promise.reject('身份证号码必填')
                        }
                        if(value) {
                            let accInfoList = getFieldsValue().accInfoList
                            let len = accInfoList.length
                            console.log(getFieldsValue())
                            if(accInfoList[len - 1].cardType === '0' && !rules.test(value)) {
                                return Promise.reject(message)
                            }else{
                                return Promise.resolve()
                            }
                        }
                    }
                    , validateTrigger: 'blur'
                })
            ]
        },
        {
            type: 'text',
            name: 'adress',
            label: '地址',
            // width: 300,
            rules: [
                {...requiredRegs, message: '地址必填'}
            ]
        }
    ]

    const changeTime = (e) => {
        setTimeType(e.target.value)
    }

    const getTimeDate = () => {

    }

    return (
        <div className='acc_add'>
            <AddForm formList={formList}/>
        </div>
    )
}
