import { lazy } from 'react'
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const MainHome = lazy(() => import('../page/Home/subPage/Home'))


export default [
    {
        name: '首页数据',
        path: '/main/home',
        key: '/main/home',
        components: MainHome,
        auth: ['super', 'normal'],
        icon: AppstoreOutlined
    },
    {
        name: '商店信息',
        path: '/main/storeInfo',
        key: '/main/storeInfo',
        components: MainHome,
        auth: ['super', 'normal'],
        icon: MenuFoldOutlined
    },
    {
        name: '商品信息',
        path: '/main/shopInfo',
        key: '/main/shopInfo',
        components: MainHome,
        auth: ['super', 'normal'],
        icon: PieChartOutlined,
        children: [
            {
                name: '商品列表',
                path: '/main/shopInfo/shopList',
                key: '/main/shopInfo/shopList',
                components: MainHome,
                auth: ['super', 'normal'],
                icon: DesktopOutlined,
            }
        ]
    }
]