import React from 'react';
import MenuConfig from '../../config'
import * as Icon from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../../store/reducers/tab'


import { Button, Layout, Menu, theme } from 'antd';


const { Header, Sider, Content } = Layout;

//動態獲取icon
const iconToElement = (name) => React.createElement(Icon[name])
//處理menu的數據
const items = MenuConfig.map((icon) => {
  //沒有子menu
  const child = {
    key: icon.path,
    icon: iconToElement(icon.icon),
    label: icon.label,
  }
  //有子menu
  if (icon.children){
    child.children = icon.children.map(item => {
      return {
        key: item.path,
        label: item.label
      }
    })
  }
  return child
})




const CommonAside = ({collapsed}) => {
  const navigate = useNavigate()
  const dispatch =  useDispatch()

  //加數據到store
  const setTabList = (val) => {
    dispatch(selectMenuList(val))
  }
  const selectMenu = (e) => {
    console.log(e,'e')
    let data
    MenuConfig.forEach(item => {
      //找到當前數據
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        //如果有子Menu
        if (e.keyPath.length > 1){
          data = item.children.find(child => {
            return child.path == e.key
          })
        }
      }
    })
    setTabList({
      path: data.path,
      name: data.name,
      label: data.label,
    })
    navigate(e.key)
  }
    return (
        <Sider trigger={null} collapsed={collapsed}>
        <h3 className="app-name">{collapsed ? '後台' : '通用後台管理系統'}</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            height: '100%' // 正確的 JavaScript 物件字面量表示法
          }}
          onClick= {selectMenu}
        />
      </Sider>
    )
}

export default CommonAside