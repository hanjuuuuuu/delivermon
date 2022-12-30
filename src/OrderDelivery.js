import { Form, Table, Space } from 'antd';
import React, {useState} from 'react';

//주문확인 페이지
const OrderDelivery = () => {
    const [form] = Form.useForm();
    const [menuInfo, setMenuInfo] = useState([]);

    const columns = [
        {
            title: '메뉴',
            dataIndex: 'FOOD_NAME',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '가격',
            dataIndex: 'PRICE',
            key: 'price',
        },
        {
            title: '옵션',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                <a>{record.name} 수정</a>
                <a>삭제</a>
                </Space>
            ),
        },
        ];

    return(
        <div>
            <Table columns={columns} dataSource={menuInfo} />;
        </div>
    )
}

export default OrderDelivery;