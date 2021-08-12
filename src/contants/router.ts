import { lazy, ReactNode } from 'react'
import mainRouter from './mainRouter'

const Login = lazy(() => import('../page/Login'))
const Home = lazy(() => import('../page/Home'))
const MainHome = lazy(() => import('../page/Home/subPage/Home'))


interface RouterType {
    name?: string | null;
    path: string;
    key: string;
    components?: ReactNode;
    children?: RouterType[];
    redirect?: string;
    auth?: string[];
    icon?: ReactNode
}

export const routerList: RouterType[] = [
    {
        name: '登录',
        path: '/login',
        key: '/login',
        components: Login,
        auth: ['super', 'normal']
    },
    {
        name: '首页',
        path: '/main',
        key: '/main',
        components: Home,
        auth: ['super', 'normal'],
        children: [
            ...mainRouter, 
            {
                path: '/main',
                key: '/main/home=to',
                redirect: '/main/home',
            }
        ]
    },
    // {
    //     path: '/',
    //     key: '/main=to',
    //     redirect: '/main'
    // }
]