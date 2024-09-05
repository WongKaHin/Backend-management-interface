import React from "react";
import { Button, Layout, Avatar, Dropdown } from 'antd';
import{ MenuFoldOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch } from 'react-redux'
import { collapseMenu } from '../../store/reducers/tab'

const { Header} = Layout;

const CommonHeader = ({ collapsed }) => {
  //登出
    const logout = () => {

    }

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              個人中心
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={() => logout} target="_blank" rel="noopener noreferrer">
              退出
            </a>
          )
        },
      ];
      //創建dispatch
      const dispatch = useDispatch()
      //點擊展開收起
      const setCollapsed = () => {
        dispatch(collapseMenu())
      }

    return(
        <Header className="header-container">
            <Button 
                icon = { <MenuFoldOutlined /> }
                type="text"
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: "#fff"
                }}
                onClick={() => setCollapsed() }
            />
            <Dropdown
              menu= {{items}}
            >
              <Avatar size={36} src={<img src={require("../../assets/images/user.jpg")}/>} />
            </Dropdown>
            
      </Header>
    )
}

export default CommonHeader