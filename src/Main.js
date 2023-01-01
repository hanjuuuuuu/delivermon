import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';

//고객 메인 페이지. 가게들이 출력되고 클릭하면 가게의 메뉴를 볼 수 있다. 메뉴 선택하고 주문할 수 있다.
const Main = ({offSignIn}) => {
    const [storeInfo, setStoreInfo] = useState([]);

    //() => alert(index)
    let columns = [
        {
            title: '가게',
            dataIndex: 'STORE_NAME',
            key: 'STORE_CODE',
            render: (text, record, index) => {
                return <Button onClick={GotoOrder(index)} >{text}</Button>                
            },
        }
    ];
    
    const GotoOrder = (storecode) => {      //클릭한 가게의 메뉴들이 보여야한다. 
        columns = [
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
        ]
        // return axios
        // .post("http://localhost:8080/callstore")
        // .then((res)=>{
        //     console.log(res.data);
        //     setStoreInfo(res.data);
        // })
        // .catch((err) => {
        //     console.log(err.res);
        // });
    }

    const onStorePrint = () => {        //가게 정보 출력
        return axios
        .post("http://localhost:8080/callstore")
        .then((res)=>{
            console.log(res.data);
            setStoreInfo(res.data);
        })
        .catch((err) => {
            console.log(err.res);
        });
    }

    useEffect (()=>{
        onStorePrint();
    }, []);

    const onClick = () => {
        return axios
        .post('http://localhost:8080/logout')
        .then((res)=> {
            offSignIn();
        })
        .catch((err)=> {
            console.log(err.response.data);
        })
    }
    

    return(
        <div>
            <div>
                <h2>고객 페이지</h2>
            </div>
            <div>
                <button onClick={onClick} >로그아웃</button>
            </div>
            <div>
                <Table columns={columns} dataSource={storeInfo} />;
            </div>
            
        </div>
        
    )
}

export default Main;