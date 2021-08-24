import React, { ReactElement } from 'react'
import { Dropdown, Menu, Avatar, Modal } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ROLETYPE } from '@/contants/contants'
import { ClEAR_INFO } from '@/redux/type'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'

interface Props {
    
}

const { confirm } = Modal;

export default function User({}: Props): ReactElement {

  const history = useHistory()
  const dispatch = useDispatch()

  const userInfo = useSelector((state: any) => state.userInfo)

  const exit = () => {
    confirm({
      title: '温馨提醒',
      icon: <ExclamationCircleOutlined />,
      content: '你确定需要退出登陆吗？',
      onOk() {
        dispatch({
          type: ClEAR_INFO
        })
        history.replace('/login')
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    })
  }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <NavLink to="/main/personal">个人信息</NavLink>
          </Menu.Item>
          <Menu.Item key="1" onClick={exit}>
            退出
          </Menu.Item>
        </Menu>
      );

    return (
        <div className="userInfo">
            <div className='user'>欢迎你: {userInfo.username}, {ROLETYPE[userInfo.role]}</div>
            <Dropdown overlay={menu} trigger={['click']} className="user_dropdown">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    操作 <DownOutlined />
                </a>
            </Dropdown>
            <div onClick={() => {
              history.push('/main/personal')
            }}>
              <Avatar size={40} icon={<UserOutlined />}/>
            </div>
        </div>
    )
}
