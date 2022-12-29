import React from 'react';

const RiderMain = ({offSignIn}) => {

    return(
        <div>
            <div>
                <h2>라이더 페이지</h2>
            </div>
            <div>
                <button onClick={offSignIn}>로그아웃</button>
            </div>
        </div>
    )
}

export default RiderMain;