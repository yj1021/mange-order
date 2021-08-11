import React, { ReactElement, ReactNode, useState } from 'react';
import { Menu } from 'antd';
import { menuList } from '../../contants/menu';
import { NavLink } from 'react-router-dom'

const { SubMenu, Item } = Menu;

interface Props {}

export default function Sider({}: Props): ReactElement {

    const [openkey, setOpenkey] = useState<string[]>([])

  const renderMenu = (menuList): ReactNode => {
    return menuList.map(menuItem => {
      let { key, icon, title, children, path } = menuItem;
      let IcomComp = icon;
      if (children && Array.isArray(children) && children.length) {
        return (
          <SubMenu key={key} title={title} icon={icon && <IcomComp />}>
            {renderMenu(children)}
          </SubMenu>
        );
      } else {
        return (
          <Item key={key} icon={icon && <IcomComp />}>
            <NavLink to={path}>{title}</NavLink>
          </Item>
        );
      }
    });
  };

  const onOpenChange = (openKeys: string[]) => {
    //   if(openKeys.includes('2')) {
    //     
    //   }
    setOpenkey(openKeys)
      console.log(openKeys, '--')
  }

  return (
    <>
      <Menu 
        mode="inline" 
        onOpenChange={onOpenChange}
        openKeys={openkey}
    >{renderMenu(menuList)}</Menu>
    </>
  );
}
