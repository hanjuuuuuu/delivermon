import React, {useEffect, useState} from 'react';
import { Table, Collapse, Button, Input } from 'antd';
import ShoppingBasket from './ShoppingBasket';

const Order = () => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [orderdata, setOrderData] = useState([]);
    const [onBasket, setOnBasket] = useState(false);
    const [sum, setSum] = useState(0);

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
                    <Input placeholder="주소" />
                    <Input placeholder="상세주소 입력" />
                    <Input placeholder="휴대전화번호 입력" />
                </Panel>
                <Panel header="결제수단 선택" key="2">
                    <Button>현장결제(카드)</Button>
                    <Button>현장결제(현금)</Button>
                    <Button>신용카드</Button>
                    <Button>휴대전화</Button>
                </Panel>
                <Panel header="요청사항" key="3">
                    <TextArea rows={4} />
                </Panel>
            </Collapse>
            <br></br>
            <button style={{width:100, height:50, marginLeft:700}} onClick={() => {}}> 결제하기 </button>
        </div>
        
    );
};

export default Order;