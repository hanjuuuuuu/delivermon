const kakao = {
    clientID: '50d82401af69d2eb95ac06692fa01a4d',
    redirectUri: 'http://localhost:3000/auth/kakao/callback',
    }

const naver = {
    clientID: 'ybCPyS_tXuxjTvDk16Ne',
    redirectUri: 'http://localhost:3000/auth/naver/callback',
    state_string:  Math.random().toString(36).substr(3, 14),
    }

    export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code`
    export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver.clientID}&state=${naver.state_string}&redirect_uri=${naver.redirectUri}`