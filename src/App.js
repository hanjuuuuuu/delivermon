import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Entrance from "./Entrance";
import SignUp from "./SignUp";
import Main from './Main';
import { userinform, userCheck } from "./Entrance";

const App = () => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    let categoryname = Entrance.usercheck;

    const onSignUp = () => {        //회원가입
        setIsSignUp(true);
    }

    const offSignUp = () => {       //회원가입 끄기
        setIsSignUp(false);
    }

    const onSignIn = () => {        //user 로그인
        setIsSignIn(true);
    }

    const offSignIn = () => {        //로그아웃
        setIsSignIn(false);
    }

    // const authHandler = () =>{  //초기 화면 렌더링 시, 로그인 유지 확인하여 페이지 렌더링
    //     return axios
    //     .get("http://localhost:8080/logincheck")
    //     .then((res)=>{
    //         console.log(res.data);
    //         onSignIn();
    //     })
    //     .catch((err) => {
    //         console.log(err.res);
    //     });
    // }
    
    // useEffect(()=>{
    //     authHandler();
    // });

    function GotoPage({category}){
        if(category === 'user'){
            return(
                <div>
                    <div>
                        <h2>고객 페이지</h2>
                    </div>
                    <div>
                        <button  >로그아웃</button>
                    </div>
                </div>
            )
        } else if(category === 'store'){
            return(
                <div>
                    <div>
                        <h2>가게 페이지</h2>
                    </div>
                    <div>
                        <button >로그아웃</button>
                    </div>
                </div>
            )
        } else if(category === 'rider'){
            return(
                <div>
                    <div>
                        <h2>라이더 페이지</h2>
                    </div>
                    <div>
                        <button >로그아웃</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {isSignUp ?
                <SignUp offSignUp={offSignUp}/> :
                isSignIn ?
                    <GotoPage category={categoryname}/> : 
                    <Entrance onSignIn={onSignIn} onSignUp={onSignUp}/>
            }
            
        </div>

        
    )
}

export default App;