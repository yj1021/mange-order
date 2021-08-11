import React, { ReactElement, ReactNode } from 'react';
import { Layout } from 'antd';
import SiderComp from '../Sider'
import './index.less'

const { Header, Footer, Sider, Content } = Layout;

interface Props {
    children: ReactNode;
}

export default function LayoutComp({
    children
}: Props): ReactElement {
  return (
    <Layout className="layout_warpper">
      <Sider>
        <SiderComp />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{ children }</Content>
      </Layout>
    </Layout>
  );
}
