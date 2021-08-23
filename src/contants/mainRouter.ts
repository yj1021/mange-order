import { lazy } from 'react'
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    DiffOutlined,
    DatabaseOutlined,
    CalendarOutlined,
    PlusOutlined
} from '@ant-design/icons';

const MainHome = lazy(() => import('@/page/Home/subPage/Home'))
const StoreInfo = lazy(() => import('@/page/Home/subPage/StoreInfo'))
const ShopInfo = lazy(() => import('../page/Home/subPage/ShopInfo'))
const ShopList = lazy(() => import('../page/Home/subPage/ShopInfo/ShopList'))
const ShopCategory = lazy(() => import('../page/Home/subPage/ShopInfo/ShopCategory'))
const ShopAdd = lazy(() => import('../page/Home/subPage/ShopInfo/ShopAdd/index'))

const AccInfo = lazy(() => import('../page/Home/subPage/AccInfo'))
const AccList = lazy(() => import('../page/Home/subPage/AccInfo/AccList'))
const AccChange = lazy(() => import('../page/Home/subPage/AccInfo/AccChange'))
const AccAdd = lazy(() => import('../page/Home/subPage/AccInfo/AccAdd'))


const Personal = lazy(() => import('../page/Home/Personal'))



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
        components: StoreInfo,
        auth: ['super', 'normal'],
        icon: MenuFoldOutlined
    },
    {
        name: '商品信息',
        path: '/main/shopInfo',
        key: '/main/shopInfo',
        components: ShopInfo,
        auth: ['super', 'normal'],
        icon: PieChartOutlined,
        children: [
            {
                name: '商品列表',
                path: '/main/shopInfo/shopList',
                key: '/main/shopInfo/shopList',
                components: ShopList,
                auth: ['super', 'normal'],
                icon: DesktopOutlined,
            },
            {
                name: '商品类别',
                path: '/main/shopInfo/shopCategory',
                key: '/main/shopInfo/shopCategory',
                components: ShopCategory,
                auth: ['super', 'normal'],
                icon: MailOutlined,
            },
            {
                name: '商品添加',
                path: '/main/shopInfo/shopAdd',
                key: '/main/shopInfo/shopAdd',
                components: ShopAdd,
                auth: ['super', 'normal'],
                icon: DiffOutlined,
            }
        ]
    },
    {
        name: '账号信息',
        path: '/main/accInfo',
        key: '/main/accInfo',
        components: AccInfo,
        icon: DatabaseOutlined,
        auth: ['super', 'normal'],
        children: [
            {
                name: '账号列表',
                path: '/main/accInfo/accList',
                key: '/main/accInfo/accList',
                components: AccList,
                icon: DatabaseOutlined,
                auth: ['super', 'normal'],
            },
            {
                name: '账号变更',
                path: '/main/accInfo/accChange',
                key: '/main/accInfo/accChange',
                components: AccChange,
                icon: CalendarOutlined,
                auth: ['super', 'normal'],
            },
            {
                name: '账号信息增加',
                path: '/main/accInfo/accAdd',
                key: '/main/accInfo/accAdd',
                components: AccAdd,
                icon: PlusOutlined,
                auth: ['super'],
            }
        ]
    },
    {
        name: '个人中心',
        path: '/main/personal',
        key: '/main/personal',
        components: Personal,
        icon: ContainerOutlined,
        auth: ['super', 'normal']
    },
]