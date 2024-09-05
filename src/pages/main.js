import React from 'react';
import { Outlet } from 'react-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { Button, Layout, Menu, theme } from 'antd';
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader';
import { useSelector } from 'react-redux'

const { Header, Sider, Content } = Layout;

const Main = () => {
  //  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //獲取展開收起state
  const collapse = useSelector(state => state.tab.isCollapse)
  return (
    <Layout className="main-container">
      <CommonAside collapsed={collapse} />
      <Layout>
      <CommonHeader collapsed={collapse} />

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main


        {/*<Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>*/}







      {/*<Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 className="app-name">通用後台管理系統</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
          style={{
            height: '100%' // 正確的 JavaScript 物件字面量表示法
          }}
        />
        </Sider>*/}
