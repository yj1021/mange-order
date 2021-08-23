import React, { ReactElement, useEffect } from 'react'
import BaseForm from '@/component/BaseForm/index';
import { useHistory } from 'react-router-dom';
import { FormItem } from '@/type';
import { requiredRegs } from '@/utils/regs';


interface Props {
    
}

const cateMock: any[] = []

for(let i=1; i<=10; i++) {
    cateMock.push({
        name: 'cate' + i,
        label: '种类' + i
    })
}

export default function ShopAdd({}: Props): ReactElement {

    const history = useHistory()

    const initData = {
        shopName: 'shangpin',
        shopCategory: 'cate6',
        shopPrice: 12,
        shopPic: [
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
        ],
        shopDesc: 'dasd'
    }

    const formList: FormItem[] = [
        {
            type: 'text',
            name: 'shopName',
            label: '商品名',
            width: 300,
            rules: [
                {...requiredRegs, message: '请输入商品名'}
            ]
            
        },
        {
            type: 'select',
            name: 'shopCategory',
            label: '商品分类',
            optionList: cateMock,
            width: 300,
            rules: [
                {...requiredRegs, message: '请选择商品分类'}
            ]
        },
        {
            type: 'number',
            name: 'shopPrice',
            label: '商品价格',
            width: 300,
            rules: [
                {...requiredRegs, message: '请输入商品价格'}
            ]
        },
        {
            type: 'upload',
            name: 'shopPic',
            label: '商品图片',
            width: 200,
            rules: [
                {...requiredRegs, message: '请上传商品图片'}
            ]
        },
        {
            type: 'textArea',
            name: 'shopDesc',
            label: '商品描述',
            width: 500,
            rules: [
                {...requiredRegs, message: '请填写商品描述'}
            ],
            maxLength: 100
        }
    ]

    const clickAdd = () => {
        setTimeout(() => {
            history.push('/main/shopInfo/shopList')
        }, 600)
    }

    const getFormData = () => {}
    return (
        <div>
            <BaseForm 
                formList={formList} 
                getFormData={getFormData}
                formItemLayout={
                    {
                        labelCol: {
                            xs: { span: 8 },
                            sm: { span: 3 },
                        }
                    }
                }
                submitText='提交'
                resetFn={() => {}}
                initData={initData}
                onClick={clickAdd}
            />
        </div>
    )
}
