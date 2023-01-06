import axios from 'axios';

const SERVER_MODE = '개발'
/* 서버 운영모드에 따라서 host를 설정 */
let host = SERVER_MODE == '운영' ? '' : 'http://localhost:8080'

const useAxios = (url) => {
    return async (params) => {
        return new Promise(
            async (resolve, reject)=> {
                try{
                    const result = await axios.post(host + url, params);
                    resolve(result);
                }catch(e){
                    reject(e);
                }
            }
        )
    }
}

export default useAxios;