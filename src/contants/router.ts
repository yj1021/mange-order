import { lazy } from 'react'

const Login = lazy(() => import('../page/Login'))
const Home = lazy(() => import('../page/Home'))
const MainHome = lazy(() => import('../page/Home/subPage/Home'))


interface RouterType {
    name: string | null;
    path: string;
    key: string;
    components?: any;
    children?: Array<RouterType>;
}

export const routerList: Array<RouterType> = [
    {
        name: '登录',
        path: '/login',
        key: '/login',
        components: Login
    },
    {
        name: '首页',
        path: '/main',
        key: '/main',
        components: Home,
        children: [
            {
                name: '首页数据',
                path: '/main/home',
                key: '/main/home',
                components: MainHome
            }
        ]
    },
]