import decode from 'jwt-decode';
import {conn} from '../network/api';


const checkAuthedOld = () => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      const decoded = decode(accessToken);
      const tokenExpiry = new Date(decoded.exp*1000);
      const now = new Date();
      if(now < tokenExpiry) {
            //Hasn't expired
            return true;
      } else {
            //Try refresh
            const refreshToken = localStorage.getItem('refresh_token');
            if(refreshToken)
            {
                conn.post('/api/account/refresh/',{ refresh: refreshToken }).then((res) => {
                    localStorage.setItem('access_token',res.data.access);
                    return true;
                }).catch((err) => {
                    return false;
                });
            } else {
                return false;
            }
      }
    } else {
        //Token doesn't exist
        return false;
    }
}


const checkAuthed = () => {
  return new Promise((resolve,reject) => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      const decoded = decode(accessToken);
      const tokenExpiry = new Date(decoded.exp*1000);
      const now = new Date();
      if(now < tokenExpiry) {
            //Hasn't expired
            console.log('TOKEN EXISTS AND IS VALID');
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
            console.log('THE TOKEN IS NOT VALID');
      }
    } else {
        //Token doesn't exist
        console.log('TOKEN DONT EXIST');
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


const authenticate2 = async payload => {
  let message = '';
  try {
    const response = await conn.post('/api/account/authenticate/',payload);
    localStorage.setItem('access_token',response.data.access);
    localStorage.setItem('refresh_token',response.data.refresh);
    message = 'Success';
  } catch(err) {
    if(err.response.data.message) {
      message = err.response.data.message;
    } else {
      message = 'An error occured trying to sign in.';
    }
  }
  return message;
}


const signOut = async () => {
    //Detroy the tokens
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
}

export {checkAuthed, authenticate, signOut};