import React from 'react';
import axios from 'axios';

const Main = ({offSignIn, gotoPage}) => {
    const onClick = () => {
        return axios
        .post('http://localhost:8080/logout')
        .then((res)=> {
            offSignIn();
        })
        .catch((err)=> {
            console.log(err.response.data);
        })
    }

    return(
        <div>
            <div>
                <h2>고객 페이지</h2>
            </div>
            <div>
                <button onClick={onClick} >로그아웃</button>
            </div>
        </div>
    )
}


export default Main;