import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Entrance from "./Entrance";
import SignUp from "./SignUp";
import Main from './Main';
import StoreMain from './StoreMain';
import RiderMain from './RiderMain';

const App = () => {
    /**
     * 페이지에서 사용하는 상태변수
     */
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [categoryname, setCategoryname] = useState("");
    const [storecode, setStoreCode] = useState("");
    const [storename, setStoreName] = useState("");

    /**
     * 화면에서 사용하는 이벤트를 정의
     */
    const onSignUp = () => {        //회원가입
        setIsSignUp(true);
    }

    const offSignUp = () => {       //회원가입 끄기
        setIsSignUp(false);
    }

    const onSignIn = (categoryname) => {        //user 로그인
        setIsSignIn(true);
        setCategoryname(categoryname);
    }

    const offSignIn = () => {        //로그아웃
        setIsSignIn(false);
    }

    const signInHandler = () =>{  //초기 화면 렌더링 시, 로그인 유지 확인하여 페이지 렌더링
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
    
    useEffect(()=>{
        signInHandler();
    });

    function GotoPage({category, storecode}){      //구조분해할당으로 로그인 category 불러와서 해당 category에 맞는 페이지 return
        if(category === 'user'){
            return(
                <Main offSignIn={offSignIn}/>
            )
        } else if(category === 'store'){
            return(
                <StoreMain offSignIn={offSignIn} storecode={storecode} storename={storename}/>
            )
        } else if(category === 'rider'){
            return(
                <RiderMain offSignIn={offSignIn} />
            )
        }
    }

    return (
        <div>
            {isSignUp ?
                <SignUp offSignUp={offSignUp}/> :
                isSignIn ?
                    <GotoPage category={categoryname} storecode={storecode}/> : 
                    <Entrance onSignIn={onSignIn} onSignUp={onSignUp} setStoreCode={setStoreCode} setStoreName={setStoreName}/>
            }
        </div>

        
    )
}

export default App;