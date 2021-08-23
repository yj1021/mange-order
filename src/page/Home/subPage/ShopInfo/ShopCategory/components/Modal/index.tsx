import React, { ReactElement, useRef } from 'react'
import BaseForm from '@/component/BaseForm';
import { Modal } from 'antd';
import { FormItem } from '@/type';
import { requiredRegs } from '@/utils/regs'
import './index.less'
import { validator } from '@/utils/tool';

interface Props {
    show: boolean;
    setShow: (val: boolean) => any;
    title: string;
}

const cateMock: any[] = []

for(let i=1; i<=10; i++) {
    cateMock.push('种类' + i)
}



export default function ModalCategory({
    show,
    setShow,
    title
}: Props): ReactElement {

    const cRef: any = useRef()

    // const sure = () => {
    //     return
    //     setShow(false)
    // }

    const validator = (rule, value) => {
        if(!value) {
            return Promise.reject('请输入商品种类')
        }
        if(cateMock.includes(value)) {
            return Promise.reject('该种类已存在')
        }else {
            return Promise.resolve()
        }
        // if()
    }

    const formList: FormItem[] = [
        {
            type: 'text',
            name: 'shopCategory',
            label: '商品种类',
            rules: [
                {...requiredRegs},
                {validator: validator, validateTrigger: 'blur'}
            ]
        },
        {
            type: 'switch',
            name: 'status',
            label: '启用状态',
        },

    ]

    const getFormData = (val) => {
        setShow(false)
    }
    return (
        <Modal 
            title={title} 
            className='category_modal'
            style={{ top: 200 }} 
            visible={show} 
            // onOk={sure} 
            onCancel={() => setShow(false)}
            afterClose={() => {
                cRef.current.resetData()
            }}
        >
            <BaseForm cRef={cRef} formList={formList} getFormData={getFormData} submitText='确定'/>
        </Modal>
    )
}
