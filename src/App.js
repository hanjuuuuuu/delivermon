import { Button, Checkbox, Form,  Radio, Input } from 'antd';
import React from 'react';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from './Oauth';

function App() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item style={{paddingTop:100, paddingLeft:50}} 
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
        label="ID"
        name="id"
        rules={[
          {
            required: true,
            message: '아이디를 입력하세요.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item style={{width:1000, marginLeft:200}}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력하세요.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{marginLeft:20}}
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Checkbox>로그인 유지</Checkbox>
      </Form.Item>

      <Form.Item style={{paddingLeft:100}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>

      <a href={NAVER_AUTH_URL}>
        <img style={{width:150, marginLeft:900}} alt="naver" src="img/naver.png"></img>  
      </a>

      <a href={KAKAO_AUTH_URL}>
        <img style={{width:150, marginLeft:20}} alt="kakao" src="img/kakao.png"></img>  
      </a>

    </Form>
  );
};
export default App;
