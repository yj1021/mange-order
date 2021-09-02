import React, { ReactElement, useState, useEffect } from 'react'
import StoreForm from '../StoreForm';
import { APY_TYPE } from '@/contants/contants'
import FormList from '@/component/form/FormList'
import { useSelector } from 'react-redux'
import './index.less'

interface Props {
    
}

export default function VerityInfo({}: Props): ReactElement {

    const storeInfo = useSelector((state: any) => state.storeInfo)

    const [optionList, setOptionList] = useState<any[]>([])
    const [childList, setChildList] = useState<any[]>([
        {
            type: 'textArea',
            name: 'remark',
            label: '审核意见',
            rules: [
                {required: true, message: '审核意见必填'}
            ],
            maxLength: 80
        }
    ])

    useEffect(() => {
        let arr = []
        setTimeout(() => {
            for(let i=0; i<20; i++) {
                arr.push({
                    value: 'shenhe' + i,
                    label: '审核人' + i
                })
            }
            setOptionList(arr)
        }, 1000)
    }, [])

    const onChange = (val) => {
        console.log(val, '0')
        let index = val.substring(6)
        setChildList(list => {
            let newList = [...list]
            let lastItem = newList.pop()
            if(index % 2 === 0) {
                storeInfo.form.setFieldsValue({
                    nextPerson: val + '_下一审批人'
                })
                let obj = {
                    type: 'input',
                    name: 'nextPerson',
                    label: '下一审批人',
                    rules: [
                        {required: true, message: '下一审批人必填'}
                    ],
                    disabled: true
                }
                return [obj, lastItem]
            }else{
                return [lastItem]
            }
        })
    }

    const formList = [
        {
            type: 'select',
            name: 'personList',
            label: '审核人',
            rules: [
                {required: true, message: '审核人必填'}
            ],
            optionList,
            onChange: onChange
        }
    ]

    return (
        <div className='verify_info'>
            <StoreForm formList={formList} submitText='提交' infoType='verityInfo'>
                <FormList formList={childList}/>
            </StoreForm>
        </div>
    )
}