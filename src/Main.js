import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import UserMenu from './UserMenu';

//고객 메인 페이지. 가게들이 출력되고 가게를 클릭하면 해당 가게 메뉴 페이지로 넘어간다.
const Main = ({offSignIn}) => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [storeInfo, setStoreInfo] = useState([]);
    const [userMenu, setUserMenu] = useState(false);
    const [storecode, setStoreCode] = useState("");
    const [storename, setStoreName] = useState("");

    const columns = [
        {
            title: '가게',
            dataIndex: 'STORE_NAME',
            key: 'STORE_CODE',
            render: (text, record, index) => {
                return <Button onClick={()=>GotoMenu(JSON.stringify(record.STORE_NAME),JSON.stringify(record.key))} >{text}</Button>             
            },
        }
    ];
    const GotoMenu = (storename, storecode) => {      //클릭한 가게의 메뉴들이 보여야한다. 
        setUserMenu(true);
        setStoreCode(storecode);
        setStoreName(storename);
        console.log(storecode);
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
        userMenu ? <UserMenu storename={storename} storecode={storecode}/> :
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