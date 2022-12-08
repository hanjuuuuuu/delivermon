import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Entrance from "./Entrance";
import SignUp from "./SignUp";
import Main from './Main';

const App = () => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const onSignUp = () => {        //회원가입
        setIsSignUp(true);
    }

    const offSignUp = () => {       //회원가입 끄기
        setIsSignUp(false);
    }

    const onSignIn = () => {        //로그인
        setIsSignIn(true);
    }

    const offSignIn = () => {        //로그아웃
        setIsSignIn(false);
    }

    const authHandler = () =>{  //초기 화면 렌더링 시, 로그인 유지 확인하여 페이지 렌더링
        return axios
        .get("http://localhost:8080/logincheck")
        .then((res)=>{
            console.log(res.data);
            onSignIn();
        })
        .catch((err) => {
            console.log(err.res);
        });
    }
    
    // useEffect(()=>{
    //     authHandler();
    // });

    return (
        <div>
            {isSignIn ?
                <Main isSignIn={isSignIn} offSignIn={offSignIn}/> : 
                <Entrance isSignUp={isSignUp} onSignUp={onSignUp}/>}
            
                {isSignUp ?
                    <SignUp isSignUp={isSignUp} offSignUp={offSignUp}/> :
                    ''}
            
        </div>

        
    )
}

export default App;