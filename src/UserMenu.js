import {useState} from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';

//고객이 가게를 선택하면 보이는 가게의 메뉴페이지. 메뉴를 선택하고 주문할 수 있다.
const UserMenu = ({storename}) => {
    const [storeMenuInfo, setStoreMenuInfo] = useState([]);
    const columns = [
        {
            title: '메뉴',
            dataIndex: 'FOOD_NAME',
            key: 'name',
            render: (text, record, index) => {
                return <Button onClick={()=>alert(JSON.stringify(record.key))} >{text}</Button>                
            },
        },
        {
            title: '가격',
            dataIndex: 'PRICE',
            key: 'price',
        },
    ]

    const GotoOrder = (storecode) => {      //클릭한 가게의 메뉴들이 보여야한다. 
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