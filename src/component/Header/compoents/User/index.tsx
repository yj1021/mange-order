import React, { ReactElement } from 'react'
import { Dropdown, Menu, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './index.less'

interface Props {
    
}

export default function User({}: Props): ReactElement {

    const menu = (
        <Menu>
          <Menu.Item key="0">
            个人信息
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
            <Avatar size={40} icon={<UserOutlined />} />
        </div>
    )
}
