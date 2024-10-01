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
import CommonTag from '../components/commonTag';
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
      <CommonTag/>
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


