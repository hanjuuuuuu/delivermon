import React, { useState } from 'react';
import Entrance from "./Entrance";
import SignUp from "./SignUp";

const App = () => {
    //const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const onSignUp = () => {        //회원가입
        setIsSignUp(true);
    }

    const offSignUp = () => {       //회원가입 끄기
        setIsSignUp(false);
    }

    return (
        <div>
            {/* {isSignIn ?
                <Main isSignIn={isSignIn} /> : 
                <Entrance isSignIn={isSignIn}  />} */}
            {isSignUp ?
                <SignUp isSignUp={isSignUp} /> :
                <Entrance isSignUp={isSignUp} onSignUp={onSignUp}/>}
        </div>
        
    )
}

export default App;