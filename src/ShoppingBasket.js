import {useEffect, useState} from 'react';
import { Table, Button, Alert} from 'antd';

const ShoppingBasket = () => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [basketdata, setBasketData] = useState([]);
    const [sum, setSum] = useState(0);

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
    const getBasket = () => {
        let basketdataTmp = JSON.parse(sessionStorage.getItem("장바구니"));

        //키값 추가
        let i = 0;
        basketdataTmp = basketdataTmp.map(
            (row) => {
                i++;
                row['key'] = i;
                return row;
            }
        )

        //합계 계산
        var hap = 0;
        for(let i=0; i<basketdataTmp.length; i++){
            hap += Number(basketdataTmp[i].price);
        }

        console.log(basketdataTmp)
        setBasketData(basketdataTmp);
        setSum(hap);
    }

    useEffect (()=>{
        getBasket();
    }, []);


    return(
        <div>
            <div>
                <h2>장바구니</h2>
            </div>
            <div>
                <Table columns={columns} dataSource={basketdata} />
            </div>
            <div>
                <h3>합계: {sum}원 </h3>
            </div>
            <div>
                <button onClick={()=>{}}> 주문하기 </button>
            </div>
            
        </div>

    )


}

export default ShoppingBasket;