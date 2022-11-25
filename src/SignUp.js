import { Form, Select, Input, Button } from 'antd';
import React from 'react';

const SignUp = () => {
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

    const finishSignUp = () => {    //db user 테이블에 저장
        console.log('회원가입이 완료되었습니다.')
    }
    
    return (
        <Form>
            <Form.Item style={{width:1000, paddingTop:10, marginLeft:200}}
                name="id"
                label="아이디"
                rules={[
                    {
                        type: 'id',
                        message: '중복된 아이디입니다.',
                    },
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
                    name={['주소', '시']}
                    noStyle
                    rules={[{ required: true, message: '주소를 입력해주세요.' }]}
                >
                    <Select placeholder="시 선택">
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
                    name={['address', 'street']}
                    noStyle
                    rules={[{ required: true, message: '시를 입력해주세요.' }]}
                >
                    <Input style={{ width: '50%' }} placeholder="도로명주소" />
                </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item {...tailFormItemLayout} style={{marginLeft:500, width:120}}>
                <Button type="primary" htmlType="submit" onClick={finishSignUp}>
                    가입하기
                </Button>
            </Form.Item>

                </Form>
    )
}


export default SignUp;