import React from 'react';
import StoreMenu from './StoreMenu';

const StoreMain = ({offSignIn}) => {

    const menuInsert = () => {          //메뉴등록버튼 누르면 memu 테이블에 메뉴 저장
        return(
            <StoreMenu />
        )
    }

    return(
        <div>
            <div>
                <h2>가게 페이지</h2>
            </div>
            <div>
                <button onClick={menuInsert}>메뉴등록</button>
            </div>
            <div>
                <button onClick={offSignIn}>로그아웃</button>
            </div>
        </div>
    )

}

export default StoreMain;