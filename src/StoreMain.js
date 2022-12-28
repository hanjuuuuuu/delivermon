import React, { useState } from 'react';
import StoreMenu from './StoreMenu';

//가게 메인 페이지. 가게등록하고 가게들 보이게 한다. 가게 클릭하면 메뉴 테이블의 음식명, 가격이 나타나야하고 메뉴등록 버튼 누르면 메뉴를 추가할 수 있게 한다.
const StoreMain = ({offSignIn, storecode}) => {
    const [isMenu, setIsMenu] = useState(false);

    const onMenuUpdate = () => {         //메뉴등록버튼 누르면 메뉴 등록 페이지 띄우기 -> memu 테이블에 메뉴 저장
        setIsMenu(true);
    }

    const offMenuUpdate =  () => {      //메뉴등록 페이지 닫기
        setIsMenu(false);
    }

    return(
        isMenu ? 
            <StoreMenu offMenuUpdate={offMenuUpdate} storecode={storecode}/> :
        <div>
            <div>
                <h2>가게 페이지</h2>
            </div>
            <div>
                <button onClick={onMenuUpdate}>메뉴등록</button>
            </div>
            <div>
                <button onClick={offSignIn}>로그아웃</button>
            </div>
        </div>
    
    )

}

export default StoreMain;