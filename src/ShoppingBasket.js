import {useEffect, useState} from 'react';
import { Table, Button, Space} from 'antd';
import UserMenu from './UserMenu';
import useAxios from './Hook/useAxios';

const ShoppingBasket = () => {
    /**
     * 사용자 HOOK
     */
    const axiosDeleteMenu = useAxios('/menudelete')

    /**
     * 페이지에서 사용하는 상태변수
     */
    const [basketdata, setBasketData] = useState([]);
    const [sum, setSum] = useState(0);
    const [onUserMenu, setOnUserMenu] = useState(false);

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
        {
            title: '옵션',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button record={record} onClick={() => alert((record.food))} >삭제</Button> 
                </Space>
            ),
        },
    ]

    const onBasketDelete = async (code) => {        
        try{
            await axiosDeleteMenu({code});
            alert("메뉴가 삭제되었습니다!");
        }catch(e){
            console.log(e);
        }
        
    }

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

    const GotoUserMenu = () => {            //가게의 메뉴페이지로 이동(이전 페이지)
        setOnUserMenu(true);
    }

    useEffect (()=>{
        getBasket();
    }, []);


    return(
        onUserMenu? <UserMenu /> :
        <div>
            <div>
                <h2>장바구니</h2>
            </div>
            <div>
                <button onClick={GotoUserMenu}> 이전 페이지 </button>
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