import React, {useEffect, useState} from 'react';
import { Table, Collapse, Radio, Input, Form } from 'antd';
import ShoppingBasket from './ShoppingBasket';

const Order = () => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [orderdata, setOrderData] = useState([]);
    const [onBasket, setOnBasket] = useState(false);
    const [sum, setSum] = useState(0);

    const [form] = Form.useForm();

    const { Panel } = Collapse;
    const { TextArea } = Input;
    

    const columns = [
        {
            title: '가게',
            dataIndex: 'storename',
            key: 'store',
    
        },
        {
            title: '메뉴',
            dataIndex: 'food',
            key: 'food'
        },
        {
            title: '가격',
            dataIndex: 'price',
            key: 'price',
        },

    ]

    const userOrderTemplete = {
        "address": "",
        "phone": "",
        "payment" : "",
        "requests": ""
    }

    const getOrder = () => {
        let basketdata = JSON.parse(sessionStorage.getItem("장바구니"));
        setOrderData(basketdata);

        //합계 계산
        var hap = 0;
        for(let i=0; i<basketdata.length; i++){
            hap += Number(basketdata[i].price);
        }
        setSum(hap);
    }

    const GotoShoppingBasket = () => {      //장바구니 페이지로 이동
        setOnBasket(true);
    }

    const saveOrder = () => {       //결제하기 버튼 누르면 주문정보 order_delivery 테이블에 저장
        let userOrder = form.getFieldsValue();
        userOrderTemplete.address = userOrder.address1 + userOrder.address2;
        userOrderTemplete.phone = userOrder.phone;
        userOrderTemplete.payment = userOrder.payment;
        userOrderTemplete.requests = userOrder.requests;

        console.log(userOrderTemplete)
    }

    useEffect (()=>{
        getOrder();
    }, []);

    return (  
        onBasket? <ShoppingBasket /> :
        <div>
            <div>
                <h2>결제하기</h2>
            </div>
            <div>
                <button onClick={GotoShoppingBasket}> 장바구니 </button>
            </div>
            <div>
            <Table columns={columns} dataSource={orderdata} />
            </div>
            <div>
                <h3>총 결제 금액: {sum}원 </h3>
            </div>
            <Collapse defaultActiveKey={['1','2','3']}>
                <Panel header="배달 정보" key="1">
                    <Form
                        form={form}
                        name="basic"
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600}}
                    >
                        <Form.Item
                            label="주소"
                            name="address"
                            rules={[
                                {
                                required: true,
                                message: '주소 입력',
                                },
                            ]}
                        >
                            <Input name="address1" placeholder="주소 입력" />
                            <br></br>
                            <Input name="address2" placeholder="상세주소 입력" />
                        </Form.Item>

                        <Form.Item
                            label="휴대전화번호"
                            name="phone"
                            rules={[
                                {
                                required: true,
                                message: '휴대전화번호 입력',
                                },
                            ]}
                        >
                            <Input placeholder="휴대전화번호 입력" />
                            </Form.Item>
                        </Form>
                </Panel>

                <Panel header="결제수단 선택" key="2">
                    <Form>
                    <Form.Item name="payment">    
                        <Radio.Group buttonStyle="solid">
                            <Radio value="a">현장결제(현금)</Radio>
                            <Radio value="b">현장결제(카드)</Radio>
                            <Radio value="c">신용카드</Radio>
                            <Radio value="d">휴대전화</Radio>
                        </Radio.Group>
                    </Form.Item>
                    </Form>
                </Panel>

                <Panel header="요청사항" key="3">
                    <Form>
                    <Form.Item name="requests">
                        <TextArea rows={4} />
                    </Form.Item>
                    </Form>
                </Panel>
            </Collapse>
            <br></br>
            <button style={{width:100, height:50, marginLeft:700}} onClick={saveOrder}> 결제하기 </button>
        </div>
        
    );
};

export default Order;