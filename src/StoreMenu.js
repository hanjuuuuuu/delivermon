import { Form, InputNumber, Button, Input } from 'antd';
import React from 'react';
import useAxios from './Hook/useAxios';

//가게 메뉴 등록 페이지.
const StoreMenu = ({offMenuUpdate, storecode}) => {
    
    /**
     * 사용자 HOOK
     */
    const axiosInsertMenu = useAxios('/menuinsert')

    const [form] = Form.useForm();
    const menuTemplete = {
        "storecode": "",
        "foodname" : "",
        "price" : ""
    }

    /**
     * 화면에서 사용하는 이벤트를 정의
     */
    const onClick = async () => {       //등록버튼 눌렀을 때 메뉴 테이블에 메뉴명, 가격 insert 
        let storeinform = form.getFieldsValue();
        menuTemplete.storecode = storecode;
        menuTemplete.foodname = storeinform.foodname;
        menuTemplete.price = storeinform.price; 
        
        try{
            await axiosInsertMenu({menuTemplete});
            alert("메뉴가 등록되었습니다!");
        }catch(e){
            console.log(e);
        }
    }

    const menuCancel = () => {
        offMenuUpdate();
    }

    return(
        <Form 
            form={form}
            name="menu"
            layout="vertical"
        >
            <Form.Item name="foodname" label="메뉴명" style={{paddingTop:100, paddingLeft:50, width:500}}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="가격" style={{paddingTop:50, paddingLeft:50, width:300}}>
                <InputNumber />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{marginTop:50, marginLeft:50, width:100}} onClick={onClick}>
                등록
            </Button>
            <Button type="primary" htmlType="submit" style={{marginTop:50, marginLeft:50, width:100}} onClick={menuCancel}>
                취소
            </Button>
        </Form>
    )
}

export default StoreMenu;