import React, { ReactElement } from 'react'
import { Dropdown, Menu, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom'
import './index.less'

interface Props {
    
}

export default function User({}: Props): ReactElement {

  const history = useHistory()

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <NavLink to="/main/personal">个人信息</NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            退出
          </Menu.Item>
        </Menu>
      );

    return (
        <div className="userInfo">
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
