import { Button, Checkbox, Form,  Radio, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from './Oauth';
import axios from 'axios';

const Entrance = ({onSignUp, isSignUp, offSignUp})  => {
  const [form] = Form.useForm();

  const userCheck = {
    "category" : "",
    "id" : "",
    "pw" : "",
    "remember" : ""
  }

  const clickSignUp = () => {   //회원가입 버튼 누르면 회원가입 창으로 이동
    onSignUp();
  }

  const onClick = () => {   //로그인 버튼 누르면 db에 id,pw있는지 확인해서 로그인 완료하기, 구분확인해서 알맞은 창으로 넘어가기, 로그인 유지 선택하면 쿠키로 유지하기
    let userinform = form.getFieldsValue();
    userCheck.category = userinform.category;
    userCheck.id = userinform.id;
    userCheck.pw = userinform.password;
    userCheck.remember = userinform.remember;
    if(userCheck.category === undefined){
      alert('구분을 체크해주세요!');
    } else if(userCheck.id === undefined || userCheck.pw === undefined){
      alert('아이디, 비밀번호를 입력하세요!');
    } else{
        console.log('userCheck', userCheck);

        axios.post("http://localhost:8080/login",
            userCheck
        )
        .then((res) => {
          console.log('res.data',res.data);
            if(res.data === 'no'){                          //로그인 실패했을 경우
              alert('아이디 혹은 비밀번호가 틀렸습니다.');
            }
            else{    //로그인 성공했을 경우(구분 확인, 로그인 유지 확인)

              if(userCheck.category === 'user'){   //고객으로 로그인 했을 경우 고객 창 띄우기
                console.log('user');
              } else if(userCheck.category === 'store'){  //가게로 로그인 했을 경우 가게 창 띄우기
                console.log('store');
              } else if(userCheck.category === 'rider'){  //라이더로 로그인 했을 경우 라이더 창 띄우기
                console.log('rider');
              }

              if(userCheck.remember){  //로그인 유지 할 경우
                console.log('로그인 유지');
              }
              else{               //로그인 유지 하지 않을 경우
                console.log('로그인 유지x');
              }
            }
        })
        .catch((error) => {
          console.log(error);  
        })
      }
  }

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
  return (
    <Form
      form={form}
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
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
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
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

      <Form.Item {...tailLayout}>
        <Button htmlType="signup" style={{width:120}} onClick={clickSignUp}>
          회원가입
        </Button>
        <Button type="primary" htmlType="signin" style={{marginLeft:30, width:120}} onClick={onClick}>
          로그인
        </Button>
      </Form.Item>

      <a href={NAVER_AUTH_URL}>
        <img style={{width:150, height:38, marginLeft:900}} alt="naver" src="img/naver.png"></img>  
      </a>

      <a href={KAKAO_AUTH_URL}>
        <img style={{width:158, marginLeft:20, marginTop:20}} alt="kakao" src="img/kakao.png"></img>  
      </a>


    </Form>
  );
};
export default Entrance;
