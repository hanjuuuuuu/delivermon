import {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Checkbox } from 'antd';
import useAxios from './Hook/useAxios';
import ShoppingBasket from './ShoppingBasket';

//고객이 가게를 선택하면 보이는 가게의 메뉴페이지. 메뉴를 선택하고 주문할 수 있다.
const UserMenu = ({storename, storecode}) => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [storeMenuInfo, setStoreMenuInfo] = useState([]);
    const [onBasket, setOnBasket] = useState(false);

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
                return <Checkbox onChange={(e)=>GotoBasket(record.FOOD_NAME, record.PRICE, e.target.checked)} >{text}</Checkbox>                
            },
        },
        {
            title: '가격',
            dataIndex: 'PRICE',
            key: 'price',
        },
    ]

    const GotoMenu = () => {      //클릭한 가게의 메뉴들이 보여야한다. 
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

    const GotoBasket = (food, price, checked) => {      //선택한 메뉴를 장바구니에 넣고, 선택 취소하면 장바구니에서 뺀다.
        console.log(food, price, checked)

        if(checked === true){       
            basket.push({storename,food,price});          //장바구니에 메뉴가 없을 경우, 장바구니에 넣기
            console.log(basket);
        }
        else{
            for(let i=0; i<basket.length; i++){     //장바구니에 메뉴가 있을 경우, 장바구니에서 삭제
                if(basket[i].food === food)
                basket = basket.filter(param => param.food !== food);
            }
            console.log(basket);
        }
    }

    const GotoOrder = () => {
        sessionStorage.setItem("장바구니", JSON.stringify(basket));
        alert("장바구니에 담았습니다.");
    }

    const GoBasketPage = () => {        //장바구니 페이지로 이동
        setOnBasket(true);
    }

    useEffect (()=>{
        GotoMenu();
    }, []);


    return(
        onBasket? <ShoppingBasket basket={basket}/> :
        <div>
            <div>
                <h2>{storename}</h2>
            </div>
            <div>
                <button onClick={GotoOrder}> 장바구니에 추가 </button>
            </div>
            <div>
                <button onClick={GoBasketPage} > 장바구니 </button>
            </div>
            <div>
                <button > 주문하기 </button>
            </div>
            <div>
                <Table columns={columns} dataSource={storeMenuInfo} />;
            </div>
            
        </div>
        
    )

}

export default UserMenu;