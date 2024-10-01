import React, { useEffect, useState } from "react";
import { Form, Button, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker  } from 'antd';
import './user.css';
import { getUser, addUser, editUser, delUser } from '../../api'
import dayjs from 'dayjs'


const User = () => {
    const [ listData, setListData] = useState({
        name: ''
    })
    const [ tableData, setTableData ] = useState([])
    //0新增 1編輯
    const [ modalType, setModalType ] = useState(0)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    //創建form實例
    const [ form ] = Form.useForm();
    //新增/編輯 Button
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen)
        if (type=='add') {
            setModalType(0)
        } else {
            setModalType(1)
            const cloneData = JSON.parse(JSON.stringify(rowData))
            cloneData.birth = dayjs(cloneData.birth)
            //表單數據回填
            form.setFieldsValue(cloneData)
        }
    }
    //提交
    const handleFinish = (e) => {
        setListData({
            name: e.keyword 
        })
    }
    //刪除
    const handleDelete = ({ id }) => {
        delUser({ id }).then(() => {
            getTableData()

        })
    }
    useEffect(() => {
        getTableData()
    },[listData])

    const getTableData = () => {
        getUser(listData).then(({ data }) => {
            //console.log(data.list, 'res')
            setTableData(data.list)
        })
    }
    //彈窗確定
    const handleOk = () => {
        form.validateFields().then((val) => {
            //console.log(val)
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            //console.log('newval',val)
            if (modalType) { //編輯
                editUser(val).then(() => {
                    handleCancel()
                    getTableData()
                })
            } else {
                addUser(val).then(() => {
                    handleCancel()
                    getTableData()
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    //彈窗取消
    const handleCancel = () => {
        setIsModalOpen(false)
        form.resetFields()
    }
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '年齡',
            dataIndex: 'age'
        },
        {
            title: '性別',
            dataIndex: 'sex',
            render: (val) => {
                return val ? '女':'男'
            }
        },
        {
            title: '出生日期',
            dataIndex: 'birth'
        },
        {
            title: '地址',
            dataIndex: 'addr'
        },
        {
            title: '操作',
            render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>編輯</Button>
                        <Popconfirm
                            title="提示"
                            description="此操作將刪除該用戶,是否確定?"
                            okText="確定"
                            cancelText ="取消"
                            onConfirm={() => handleDelete(rowData)}
                        >
                        <Button type="primary" danger >刪除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },

    ]
    useEffect(() => {
        getTableData()
    }, [])
    return(
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>新增</Button>
                <Form
                    layout = "inline"
                    onFinish = {handleFinish}
                >
                    <Form.Item name="keyword">
                        <Input placeholder="請輸入用戶名"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type="primary" >搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{marginTop:'10px'}} columns={columns} dataSource={tableData} rowKey={'id'} />
            <Modal
                visible={isModalOpen}
                title={ modalType ? '編輯用戶': '新增用戶' }
                onOk={handleOk}
                onCancel={handleCancel}
                okText="確定"
                cancelText="取消"
            >
            
            <Form
                form={form}
                labelCol={{
                    span: 6
                }}
                wrapperCol={{
                    span:18
                }}
                labelAlign="left"
            >
                { modalType == 1 &&
                    <Form.Item
                        name='id'
                        hidden
                    >
                        <Input/>
                    </Form.Item>

                }
                <Form.Item
                    label='姓名'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: '請輸入姓名'
                        }
                    ]}
                >
                    <Input placeholder='請輸入姓名'/>
                </Form.Item>
                <Form.Item
                    label='年齡'
                    name='age'
                    rules={[
                        {
                            required: true,
                            message: '請輸入年齡'
                        },
                        {
                            type: "number",
                            message: "年齡必須是數字"
                        }
                    ]}
                >
                    <InputNumber placeholder='請輸入年齡'/>
                </Form.Item>
                <Form.Item
                    label='性別'
                    name='sex'
                    rules={[
                        {
                            required: true,
                            message: '性別是必選'
                        }
                    ]}
                >
                    <Select
                    placeholder="請選擇性別"
                         options = {[
                            { value:0, label: '男' },
                            { value:1, label: '女' },
                         ]}
                         />
                </Form.Item>
                <Form.Item
                    label='出生日期'
                    name='birth'
                    rules={[
                        {
                            required: true,
                            message: '請選擇出生日期'
                        }
                    ]}
                >
                    <DatePicker placeholder='請選擇出生日期' format='YYYY/MM/DD' />
                </Form.Item>
                <Form.Item
                    label='地址'
                    name='addr'
                    rules={[
                        {
                            required: true,
                            message: '請輸入地址'
                        }
                    ]}
                >
                    <Input placeholder='請輸入地址'/>
                </Form.Item>
            </Form>
            </Modal>
        </div>
    )
}

export default User