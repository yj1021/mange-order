import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CHANGE_STEP } from '@/redux/type'
import { Button } from 'antd';
import './index.less'

interface Props {
    
}

class StoreHeader extends PureComponent<any, {}> {

    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        //@ts-ignore
        console.log(this.props.storeInfo)
    }

    clickBtn = () => {
        this.props.add(this.props.storeInfo.step + 1)
    }

    render() {
        let { 
            init,
            baseInfo,
            storeInfo,
            AccInfo,
            deliveryInfo,
            payInfo,
            verityInfo
        } = this.props.storeInfo
        return (
            <div className='shore_info_header'>
                <div className='title'>初始化</div>
                <div className='item'>
                    <p>
                        <label>商户类型:</label>{init?.storeType.join('-') || '-'}
                    </p>
                </div>
                <div className='title'>基本信息</div>
                <div className='item'>
                    <p><label>商户名称:</label>{baseInfo?.name || '-'}</p>
                    <p><label>商户地址:</label>{baseInfo?.adress || '-'}</p>
                    <p><label>商户联系方式:</label>{baseInfo?.tel || '-'}</p>
                    <p><label>商户紧急联系人:</label>{baseInfo?.importTel || '-'}</p>
                    <p><label>商户证件类型:</label>{baseInfo?.cardTypr || '-'}</p>
                    <p><label>商户证件号码:</label>{baseInfo?.cardNum || '-'}</p>
                </div>
                <div className='title'>商店信息</div>
                <div className='item'>
                    <p><label>商店名称:</label>{storeInfo?.storeName || '-'}</p>
                    <p><label>送餐费:</label>{storeInfo?.tip || '-'}</p>
                    <p><label>配送时长:</label>{storeInfo?.sendTime || '-'}</p>
                    <p><label>满意程度:</label>{storeInfo?.star || '-'}</p>
                    <p><label>活动时间:</label>{storeInfo?.date.join(' ') || '-'}</p>
                </div>
                <div className='title'>账号信息</div>
                <div className='item'>
                    <p><label>账号名称:</label>{AccInfo?.accName || '-'}</p>
                </div>
                <div className='title'>快递信息</div>
                <div className='item'>
                    <p><label>快递名称:</label>{deliveryInfo?.deliveryName || '-'}</p>
                </div>
                <div className='title'>支付方式</div>
                <div className='item'>
                    <p><label>支付方式:</label>{payInfo?.payType || '-'}</p>
                    <p><label>费率上限:</label>{payInfo?.limit || '-'}</p>
                    <p><label>费率:</label>{payInfo?.child1 || '-'}</p>
                </div>
                <div className='title'>审核</div>
                <div className='item'>
                    <p><label>审核人:</label>{verityInfo?.personList || '-'}</p>
                    {verityInfo?.nextPerson && <p><label>下一审批人:</label>{verityInfo?.nextPerson || '-'}</p>}
                    <p><label>审核意见:</label>{verityInfo?.remark || '-'}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    storeInfo: state.storeInfo   
})

const mapDispatchToProps = (dispatch) => {
    return ({
        add: (params) => dispatch({
            type: CHANGE_STEP,
            params
        })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreHeader)
