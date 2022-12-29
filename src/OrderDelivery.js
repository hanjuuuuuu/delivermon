import { Form, InputNumber, Button, Input } from 'antd';
import React from 'react';

const OrderDelivery = () => {
    const [form] = Form.useForm();

    return(
        <Form 
            form={form}
            name="menu"
            layout="vertical"
        >
            <Form.Item name="ordercode" label="주문번호" style={{paddingTop:100, paddingLeft:50, width:500}}>
                <Input />
            </Form.Item>
            <Form.Item name="usercode" label="고객코드" style={{paddingTop:50, paddingLeft:50, width:300}}>
                <InputNumber />
            </Form.Item>
            <Button type="primary" htmlType="cooking" style={{marginTop:50, marginLeft:50, width:100}} >
                조리완료
            </Button>
        </Form>
    )
}

export default OrderDelivery;