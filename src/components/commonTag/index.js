import React from "antd"
import { Tag, Space } from 'antd'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import { closeTag, setCurrentMenu } from '../../store/reducers/tab';

const CommonTag = () => {
    const tabsList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector (state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    console.log(tabsList,'123')
    const handleClose = (tag, index) => {
        let length = tabsList.length - 1
        dispatch(closeTag(tag))
        //關閉不是當前的tag
        if (tag.path !== action.pathname) {
            return
        }
        if (index === length) {
            //設置當前數據
            const curData = tabsList[index - 1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        } else {
            if (tabsList.length > 1) {
                //下一個tag
                const nextData = tabsList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }
    //點擊tag
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }
    //tag顯示
    const setTag = (flag, item, index) => {
        return (
            flag ?
            <Tag color="#55acee" closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
            :
            <Tag onClick={() => handleChange(item)} key={item.name} >{ item.label }</Tag>
        )
    }
    return (
        <Space className="common-tag" size={[0,8]} wrap>
        {/* <Tag>首頁</Tag>
            <Tag color="#55acee" closeIcon onClose={() => handleClose()}>
                用戶列表
            </Tag>*/}
            {
                currentMenu.name && tabsList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag