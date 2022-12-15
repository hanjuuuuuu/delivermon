import { Form, Select, Input, Button, Radio } from 'antd';
import React from 'react';
import axios from 'axios';

const SignUp = ({offSignUp}) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
            },
    };

    const userTemplete = {
        "id": "",
        "pw": "",
        "name": "", 
        "phone": "",
        "address": ""
    }

    const finishSignUp = () => {    //가입하기 버튼 누르면 구분에 따라서 db user/store/rider 테이블에 저장
        let userSign = form.getFieldsValue();
        userTemplete.category = userSign.category;
        userTemplete.id = userSign.id;
        userTemplete.pw = userSign.password;
        userTemplete.name = userSign.name;
        userTemplete.phone = userSign.phone;
        userTemplete.address = userSign.city + userSign.street;
        console.log(userTemplete);

        axios.post("http://localhost:8080/signup",
            userTemplete
        )
        .then((response) => {
            alert('회원가입이 완료되었습니다!')
            console.log(response.data); 
            offSignUp();
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const clickCancel = () => {     //취소 버튼 누르면 처음 화면으로 돌아가기
        offSignUp();
    }
    
    return (
        <Form
            form={form}
            style={{paddingRight:30, marginTop:300, marginRight:500}}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: false,
            }}
            autoComplete="off"
        >
            <Form.Item style={{width:1000, paddingTop:10, paddingLeft:300, marginTop:200}}
                label="구분" 
                name="category"
                rules={[
                {
                    required: true,
                    message: '구분을 체크해주세요.',
                },
                ]}
            >
                <Radio.Group>
                    <Radio value="user"> 고객 </Radio>
                    <Radio value="store"> 가게 </Radio>
                    <Radio value="rider"> 라이더 </Radio>
                </Radio.Group>
            
            </Form.Item>
            <Form.Item style={{width:1000, paddingTop:10, marginLeft:200}}
                name="id"
                label="아이디"
                rules={[
                    {
                    required: true,
                    message: '아이디를 입력해주세요.',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item style={{width:1000, paddingTop:10, marginLeft:200}}
                name="password"
                label="비밀번호"
                rules={[
                {
                    required: true,
                    message: '비밀번호를 입력하세요.',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item style={{width:1000, paddingTop:10, marginLeft:200}}
                name="confirm"
                label="비밀번호 확인"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: '비밀번호를 확인하세요.',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('비밀번호가 맞지 않습니다.'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item style={{width:1000, paddingTop:10, marginLeft:200}}
                label="이름"
                name="name"
                rules={[
                {
                    required: true,
                    message: '이름을 입력해주세요.',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item style={{width:1000, paddingTop:10, marginLeft:200}}
                label="전화번호"
                name="phone"
                rules={[
                {
                    required: true,
                    message: '전화번호를 입력해주세요.',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="주소" style={{width:1000, paddingTop:10, marginLeft:200}}>
                <Input.Group compact>
                <Form.Item
                    name="city"
                    noStyle
                    rules={[{ required: true, message: '시를 입력해주세요.' }]}
                >
                    <Select placeholder="시 선택" >
                    <Option value="강원">강원</Option>
                    <Option value="경기">경기</Option>
                    <Option value="경남">경남</Option>
                    <Option value="경북">경북</Option>
                    <Option value="광주">광주</Option>
                    <Option value="대구">대구</Option>
                    <Option value="대전">대전</Option>
                    <Option value="부산">부산</Option>
                    <Option value="서울">서울</Option>
                    <Option value="세종">세종</Option>
                    <Option value="울산">울산</Option>
                    <Option value="인천">인천</Option>
                    <Option value="전남">전남</Option>
                    <Option value="전북">전북</Option>
                    <Option value="제주">제주</Option>
                    <Option value="충남">충남</Option>
                    <Option value="충북">충북</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="street"
                    noStyle
                    rules={[{ required: true, message: '도로명 주소를 입력해주세요.' }]}
                >
                    <Input style={{ width: '50%' }} placeholder="도로명주소" />
                </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button htmlType="cancel" style={{marginLeft:10, width:120, marginTop:50}} onClick={clickCancel}>
                    취소
                </Button>
                <Button type="primary" htmlType="submit" style={{marginLeft:30, width:120, marginTop:50}} onClick={finishSignUp}>
                    가입하기
                </Button>
            </Form.Item>

            </Form>
    );
}


export default SignUp;