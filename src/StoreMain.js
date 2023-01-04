import React, { useState, useEffect } from 'react';
import { Space, Table, Button } from 'antd';
import axios from 'axios';
import StoreMenu from './StoreMenu';
import OrderDelivery from "./OrderDelivery"


//가게 메인 페이지. 가게등록하고 가게들 보이게 한다. 가게 클릭하면 메뉴 테이블의 음식명, 가격이 나타나야하고 메뉴등록 버튼 누르면 메뉴를 추가할 수 있게 한다.

const StoreMain = ({offSignIn, storecode, storename}) => {
    const [isMenu, setIsMenu] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const [menuInfo, setMenuInfo] = useState([]);

    const onMenuUpdate = () => {         //메뉴등록버튼 누르면 메뉴 등록 페이지 띄우기 -> memu 테이블에 메뉴 저장
        setIsMenu(true);
    }

    const offMenuUpdate =  () => {      //메뉴 등록 페이지 닫기
        setIsMenu(false);
    }

    const onOrderCheck = () => {        //주문확인버튼 누르면 주문 확인 페이지 띄우기
        setIsOrder(true);
    }

    const offOrderCheck = () => {       //주문 확인 페이지 닫기
        setIsOrder(false);
    }

    const onMenuPrint = () => {         //메뉴 테이블에 있는 메뉴 중 가게와 맞는 메뉴 출력
        return axios
        .post("http://localhost:8080/callmenu")
        .then((res)=>{
            console.log(res.data);
            setMenuInfo(res.data)
        })
        .catch((err) => {
            console.log(err.res);
        });
    }

    const onMenuChange = () => {            //메뉴 수정 버튼

        axios.post("http://localhost:8080/menuupdate",
        
    )
    .then((response) => {
        alert("메뉴가 등록되었습니다!");
        console.log(response.data);
        // window.location = '/'
    })
    .catch((error) => {
        console.log(error);
    })

    }

    const onMenuDelete = (foodcode) => {        //메뉴 삭제 버튼
        console.log(foodcode)
        axios.post("http://localhost:8080/menudelete",
            {foodcode: foodcode}
        )
        .then((response) => {
            alert("메뉴가 삭제되었습니다!");
            console.log(response.data);
            // window.location = '/'
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {          
        onMenuPrint();
    }, [])

    const columns = [
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
        {
            title: '옵션',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button record={record} onClick={onMenuChange} >수정</Button> 
                    <Button record={record} onClick={() => onMenuDelete(JSON.stringify(record.key))} >삭제</Button> 
                </Space>
            ),
        },
        ];
    

    return(
        isMenu ? 
            <StoreMenu offMenuUpdate={offMenuUpdate} storecode={storecode}/> :
            isOrder?
                <OrderDelivery offOrderCheck={offOrderCheck}/> :
                    <div>
                        <div>
                            <h2>{storename} 가게 페이지</h2>
                        </div>
                        <div>
                            <h4> </h4>
                        </div>
                        <div>
                            <button onClick={onMenuUpdate}>메뉴등록</button>
                        </div>
                        <div>
                            <button onClick={onOrderCheck}>주문확인</button>
                        </div>
                        <div>
                            <button onClick={offSignIn}>로그아웃</button>
                        </div>
                        <Table columns={columns} dataSource={menuInfo} />;
                    </div>
                
    )

}

export default StoreMain;