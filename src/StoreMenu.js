import { Form, InputNumber, Button, Input } from 'antd';
import React from 'react';

const StoreMenu = () => {

    const [form] = Form.useForm();

    return(
        <Form 
            form={form}
            name="menu"
            layout="vertical"
        >
            <Form.Item name="menuname" label="메뉴명">
                <Input />
            </Form.Item>
            <Form.Item name="price" label="가격">
                <InputNumber />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                등록
            </Button>
        </Form>
    )
}

export default StoreMenu;