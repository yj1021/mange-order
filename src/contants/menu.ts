import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react'

interface MenuItemType {
    title: string;
    path?: string;
    key: string;
    icon?: ReactNode;
    children?: MenuItemType[];
}

export const menuList: MenuItemType[] = [
    {
        title: '首页',
        key: '1',
        icon: AppstoreOutlined,
        path: '/main/home'
    },
    {
        title: 'test',
        key: '2',
        icon: MenuUnfoldOutlined,
        children: [
            {
                title: 'test1',
                key: '21',
                icon: MenuFoldOutlined,
                path: '/main/test'
            }
        ]
    },
]