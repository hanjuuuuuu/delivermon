import React from 'react';
import axios from 'axios';

const Main = (offSignIn) => {
    const onClick = async () => {
        try {
            const res = await axios
                .post('http://localhost:8080/logout');
            offSignIn();
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return(
        <div>
            <div>
                <h2>Main Page</h2>
            </div>
            <div>
                <button onClick={onClick} >로그아웃</button>
            </div>
        </div>
    )
}


export default Main;