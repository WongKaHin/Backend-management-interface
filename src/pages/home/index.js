import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from 'antd'
import './home.css'
import { getData } from '../../api'
import * as Icon from '@ant-design/icons';

//table的數據
const columns = [
    {
        title: '課程',
        dataIndex: 'name'
    },
    {
        title: '今日購買',
        dataIndex: 'todayBuy'
    },
    {
        title: '本月購買',
        dataIndex: 'monthBuy'
    },
    {
        title: '總購買',
        dataIndex: 'totalBuy'
    },
]

const countData = [
    {
        "name": "今日支付訂單",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏訂單",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "今日未支付訂單",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "今日支付訂單",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏訂單",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "今日未支付訂單",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
]
const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {
    const userImg = require("../../assets/images/user.jpg")
    useEffect(() => {
        getData().then(({ data }) => {
            console.log(data,'res')
            const { tableData } = data.data
            setTableData(tableData)
        })
    }, [])
    //定義table數據
    const [tableData, setTableData] = useState([])

    return(
        <Row className="home">
            <Col span={8}>
                <Card hoverable>
                    <div className="user">
                        <img src={userImg}/>
                        <div className="userinfo">
                            <p className="name">Admin</p>
                            <p className="access">超級管理員</p>
                        </div>
                    </div>
                    <div className="login-info">
                        <p>上次登錄時間:<span>2024-4-30</span></p>
                        <p>上次登錄地點:<span>台灣</span></p>
                    </div>
                </Card>
                <Card>
                    <Table rowkey={"name"} columns={columns} dataSource={tableData} pagination={false} />
                </Card>
            </Col>
            <Col span={16}>
                <div className="num">
                    {
                        countData.map((item, index) => {
                            return (
                                <Card key={index}>
                                    <div className="icon-box" style={{background: item.color}}>
                                        { iconToElement(item.icon) }
                                    </div>
                                    <div className="detail">
                                        <p className="num">NT {item.value}</p>
                                        <p className="text">{item.name}</p>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
            </Col>
        </Row>
    )
}

export default Home