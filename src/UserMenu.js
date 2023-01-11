import {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Checkbox } from 'antd';
import useAxios from './Hook/useAxios';

//고객이 가게를 선택하면 보이는 가게의 메뉴페이지. 메뉴를 선택하고 주문할 수 있다.
const UserMenu = ({storename, storecode}) => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [storeMenuInfo, setStoreMenuInfo] = useState([]);

    /**
     * 사용자 HOOK
     */
    const axiosCallMenu = useAxios('/callmenu');

    var basket = [];    
    const columns = [
        {
            title: '메뉴',
            dataIndex: 'FOOD_NAME',
            key: 'name',
            render: (text, record, index) => {
                return <Checkbox onChange={(e)=>IntoBasket(JSON.stringify(record.key), e.target.checked)} >{text}</Checkbox>                
            },
        },
        {
            title: '가격',
            dataIndex: 'PRICE',
            key: 'price',
        },
    ]

    const GotoOrder = () => {      //클릭한 가게의 메뉴들이 보여야한다. 
        axios.post("http://localhost:8080/callmenu", 
            {storecode: storecode}
        )
        .then((res)=>{
            console.log(res.data);
            setStoreMenuInfo(res.data);
        })
        .catch((err) => {
            console.log(err.res);
        });
    }

    const IntoBasket = (foodcode, checked) => {      //선택한 메뉴를 장바구니에 넣는다.
        if(checked === true){
            if(basket.includes(foodcode) === false)     //장바구니에 메뉴가 없을 경우, 장바구니에 넣기
                basket.push(foodcode);
            console.log(basket);
        }
        else{
            if(basket.includes(foodcode) === true){     //장바구니에 메뉴가 있을 경우, 장바구니에서 삭제
                for(let i=0; i<basket.length; i++){
                    if(basket[i] === foodcode){
                        basket.splice(i, 1);
                        i--;
                    }
                }
            }
            console.log(basket);
        }
    }

    useEffect (()=>{
        GotoOrder();
    }, []);


    return(
        <div>
            <div>
                <h2>{storename}</h2>
            </div>
            <div>
                <button >로그아웃</button>
            </div>
            <div>
                <Table columns={columns} dataSource={storeMenuInfo} />;
            </div>
            
        </div>
        
    )

}

export default UserMenu;