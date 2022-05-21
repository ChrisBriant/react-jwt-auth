import decode from 'jwt-decode';
import {conn} from '../network/api';


const checkAuthed = () => {
  return new Promise((resolve,reject) => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      const decoded = decode(accessToken);
      const tokenExpiry = new Date(decoded.exp*1000);
      const now = new Date();
      if(now < tokenExpiry) {
            //Hasn't expired
            return resolve(true);
      } else {
            //Try refresh
            const refreshToken = localStorage.getItem('refresh_token');
            if(refreshToken)
            {
                conn.post('/api/account/refresh/',{ refresh: refreshToken }).then((res) => {
                    localStorage.setItem('access_token',res.data.access);
                    return resolve(true);
                }).catch((err) => {
                    return resolve(false);
                });
            } else {
                return resolve(false);
            }
      }
    } else {
        //Token doesn't exist
        return resolve(false);
    }
  });
}


const authenticate =  payload => {
  return new Promise((resolve,reject) => {
      conn.post('/api/account/authenticate/',payload)
      .then( (response) => {
        localStorage.setItem('access_token',response.data.access);
        localStorage.setItem('refresh_token',response.data.refresh);
        return resolve('Success');
      }).catch((err) => {
        console.log(err);
        return resolve('An error occured');
      });
  });
}

const signOut = async () => {
    //Detroy the tokens
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
}

export {checkAuthed, authenticate, signOut};