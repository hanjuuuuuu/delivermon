import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Space } from 'antd';
import userEvent from '@testing-library/user-event';

//고객 메인 페이지. 가게들이 출력되고 클릭하면 가게의 메뉴를 볼 수 있다. 메뉴 선택하고 주문할 수 있다.
const Main = ({offSignIn}) => {
    const [storeInfo, setStoreInfo] = useState([]);

    const columns = [
        {
            title: '가게',
            dataIndex: 'STORE_NAME',
            key: 'name',
            render: (text) => <a>{text}</a>,
        }
    ];

    const onStorePrint = () => {        //가게 정보 출력
        return axios
        .post("http://localhost:8080/callstore")
        .then((res)=>{
            console.log(res.data);
            setStoreInfo(res.data)
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