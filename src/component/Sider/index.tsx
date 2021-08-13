import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { Menu } from 'antd';
import menuList from '@/contants/mainRouter';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { CHANGEMENU } from '@/redux/type'

const { SubMenu, Item } = Menu;

interface Props {}

export default function Sider({}: Props): ReactElement {

  const [openkey, setOpenkey] = useState<string[]>([])
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    let { pathname } = location
    let breadInfo = getBreadInfo(pathname, menuList, [])
    breadInfo[breadInfo.length -1].path = ''
    dispatch({
      type: CHANGEMENU,
      format: {
        currentPath: pathname,
        breadInfo
      }
    })
  }, [location])

  const renderMenu = (menuList): ReactNode => {
    return menuList.map(menuItem => {
      let { key, icon, name, children, path } = menuItem;
      let IcomComp = icon;
      if (children && Array.isArray(children) && children.length) {
        return (
          <SubMenu key={key} title={name} icon={icon && <IcomComp />}>
            {renderMenu(children)}
          </SubMenu>
        );
      } else {
        return (
          <Item key={key} icon={icon && <IcomComp />}>
            <NavLink to={path}>{name}</NavLink>
          </Item>
        );
      }
    });
  };

  const onOpenChange = (openKeys: string[]) => {
    setOpenkey(openKeys)
  }

  const getBreadInfo = (selectedKeys: string, menuList: any[], initBread: any[] = []): any[] => {
    let selKeys = selectedKeys
    let breadInfo = initBread
    let selectMenu = menuList.find(menuItem => selKeys.includes(menuItem.path))
    breadInfo.push({
      name: selectMenu.name,
      path: selectMenu.path
    })
    if(selectMenu.path !== selKeys) {
      getBreadInfo(selectedKeys, selectMenu.children, breadInfo)
    }
    return breadInfo
  }

  return (
    <>
      <Menu 
        mode="inline" 
        onOpenChange={onOpenChange}
        openKeys={openkey}
        selectedKeys={[location.pathname]}
    >{renderMenu(menuList)}</Menu>
    </>
  );
}
