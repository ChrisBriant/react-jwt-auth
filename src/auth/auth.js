import decode from 'jwt-decode';
import {conn} from '../network/api';

// const tryRefresh = async (refreshToken) => {
//     //let result = false;
//     try {
//         const response = await conn.post('/api/account/refresh/',refreshToken);
//         console.log('REFRESH TRY',response);
//         return true;
//     } catch(err) {
//         console.log('REFRESH ERROR',err);
//         return false;
//     }
//     console.log('WAITING');
//     //return result;
// }

const checkAuthed = () => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    if(accessToken) {
      const decoded = decode(accessToken);
      const tokenExpiry = new Date(decoded.exp*1000);
      const now = new Date();
      console.log(now < tokenExpiry, now, tokenExpiry);
      if(now < tokenExpiry) {
            //Hasn't expired
            return true;
      } else {
            //Try refresh
            const refreshToken = localStorage.getItem('refresh_token');
            if(refreshToken)
            {
                //tryRefresh().then(console.log('TRIED REFRESH')).catch(console.log('FAILED REFRESH'));

                conn.post('/api/account/refresh/',{ refresh: refreshToken }).then((res) => {
                    console.log('REFRESH RESULT', res);
                    localStorage.setItem('access_token',res.data.access);
                    return true;
                }).catch((err) => {
                    console.log('REFRESH ERROR',err);
                    return false;
                });
                //console.log('Trid refresh', result);
            } else {
                return false;
            }
      }
    } else {
        //Token doesn't exist
        return false;
    }
}


const authenticate = async payload => {
    //const accessToken = localStorage.getItem('access_token');
      //const decoded = decode(accessToken);
    console.log(payload);
    let message = '';
    try {
      const response = await conn.post('/api/account/authenticate/',payload);
      console.log(response.data.access);
      localStorage.setItem('access_token',response.data.access);
      localStorage.setItem('refresh_token',response.data.refresh);
      message = 'Success';
    } catch(err) {
      //console.log(err);
      if(err.response.data.message) {
        message = err.response.data.message;
      } else {
        message = 'An error occured trying to sign in.';
      }
    }
    return message;
}

export {checkAuthed, authenticate};