import axios from 'axios';

const useAxios = (url) => {
    return async (params) => {
        try{
            const result = await axios.post(url, params)
        }catch(e){
            console.log(e);
        }
    }
}

export default useAxios;