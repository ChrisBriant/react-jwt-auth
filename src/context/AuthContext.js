import createDataContext from './createDataContext';
import {conn} from '../network/api';
import decode from 'jwt-decode';

const defaultState = {
  authed: false,
  formErrors: [],
//   token: null,
//   errorMessage: '',
//   userId: null,
//   isAdmin: false,
//   regSuccess: false,
//   setForgotSuccess: false,
//   changeSuccess: false,
//   cookiesAccepted: true
};

const authReducer = (state,action) => {
  switch(action.type) {
    // case 'add_error':
    //   return {...state,errorMessage:action.payload};
    // case 'signin':
    //   return {...state,errorMessage:'',accessToken:action.payload};
    case 'setFormErrors':
      return {...state,formErrors:action.payload};
    case 'setAuthed':
      return {...state,authed:action.payload};
    // case 'setUnauthed':
    //   return {...state,authed:false};
    // case 'clear_error_message':
    //   return {...state,errorMessage:''};
    // case 'setId':
    //   return {...state,userId:action.payload};
    // case 'setIsAdmin':
    //   return {...state,isAdmin:action.payload};
    // case 'signout':
    //   return {token: null, errorMessage: ''};
    // case 'regSuccess':
    //   return {...state, regSuccess: true};
    // case 'setForgotSuccess':
    //   return {...state, forgotSuccess: action.payload};
    // case 'setChangeSuccess':
    //   return {...state, changeSuccess: action.payload};
    // case 'cookiesAccept':
    //   if(action.payload) {
    //     return {...state, cookiesAccepted: true};
    //   } else {
    //     return {...state, cookiesAccepted: false};
    //   }
    default:
      return defaultState;
  }
};

// const clearErrorMessage = dispatch => () => {
//   dispatch({type: 'clear_error_message'});
// };

// const tryLocalSignin = dispatch => async () => {
//   const accessToken = localStorage.getItem('access_token');
//   if(accessToken) {
//     dispatch({type:'setAuthed', payload:accessToken});
//   } else {
//     dispatch({type:'setUnauthed', payload:null});
//   }
// };

// const register = dispatch => async ({username,email,password,passchk}) => {
//     //Make api request to sign up with that email and Password
//     try {
//       const response = await catApi.post('/api/register/',
//                                           {username,email,password,passchk}
//                         )
//                         .then(res => {
//                           //SAVE TO STORAGE
//                           dispatch({type:'regSuccess', payload:null});
//                         });
//     } catch (err) {
//       dispatch({type:'add_error', payload: 'Something went wrong with sign up'});
//     }
//   };


// const signin = (dispatch) => async ({email, password}) => {
//   let signInSuccess;
//   try {
//     const response = await catApi.post('/api/authenticate/',
//                                         {email,password}
//                       )
//                       .then(res => {
//                         //SAVE TO STORAGE
//                         localStorage.setItem("access_token", res.data.access);
//                         dispatch({type:'signin', payload:res.data.access});
//                         const decoded = decode(res.data.access);
//                         dispatch({type:'setAuthed', payload:true});
//                         dispatch({type:'setId', payload:decoded.user_id});
//                         dispatch({type:'setIsAdmin', payload:decoded.is_admin});
//                         signInSuccess = true;
//                       });
//   } catch (err){
//     dispatch({
//       type: 'add_error',
//       payload: 'Something went wrong with sign in'
//     });
//     signInSuccess =false;
//   }
//   return signInSuccess;
// }

const checkAuthed= dispatch => async () => {
  const accessToken = await localStorage.getItem('access_token');
  console.log(accessToken);
  if(accessToken) {
    const decoded = decode(accessToken);
    const tokenExpiry = new Date(decoded.exp*1000);
    const now = new Date();
    console.log(now < tokenExpiry, now, tokenExpiry);
    if(now < tokenExpiry) {
      dispatch({type:'setAuthed', payload:true});
    } else {
      dispatch({type:'setAuthed', payload:false});
    }
  } else {
    dispatch({type:'setAuthed', payload:false});
  }
}

const authenticate = dispatch => async payload => {
    //const accessToken = localStorage.getItem('access_token');
      //const decoded = decode(accessToken);
    console.log(payload);
    try {
      const response = await conn.post('/api/account/authenticate/',payload);
      console.log(response.data.access);
      localStorage.setItem('access_token',response.data.access);
      localStorage.setItem('refresh_token',response.data.refresh);
      dispatch({type:'setAuthed', payload:true});
    } catch(err) {
      console.log(err);
      if(err.response.data.message) {
        dispatch({type:'setFormErrors', payload:[err.response.data.message,]});
      } else {
        dispatch({type:'setFormErrors', payload:['An error occured trying to sign in.',]});
      }
    }
}

const setAuthed = dispatch => authed => {
  dispatch({type:'setAuthed', payload:authed});
}

const setFormErrors = dispatch => async errors => {
  dispatch({type:'setFormErrors', payload:errors});
}



// const signout = dispatch => async () => {
//   localStorage.removeItem('access_token');
//   dispatch({type:'setUnauthed', payload:null});
//   dispatch({type:'setId', payload:null});
// }

// const forgotPassword = dispatch => async (data) => {

//   try {
//     const response = await catApi.post('/api/forgotpassword/',
//                                         data
//                       )
//                       .then(res => {
//                         dispatch({type:'setChangeSuccess', payload:true});
//                       });
//     } catch (err) {
//       dispatch({
//         type: 'add_error',
//         payload: 'Sorry something went wrong'
//       });
//     }
// }


// const changePassword = dispatch => async (data) => {

//   try {
//     const response = await catApi.post('/api/changepassword/',
//                                         data
//                       )
//                       .then(res => {
//                         dispatch({type:'setForgotSuccess', payload:true});
//                       });
//     } catch (err) {
//       dispatch({
//         type: 'add_error',
//         payload: 'Password reset failed'
//       });
//     }
//   }

// const resetForgotPassword  = dispatch => async (email) => {
//   dispatch({type:'setForgotSuccess', payload:false});
// }

// const hasAcceptedCookies = (dispatch) => () => {
//   const accepted = localStorage.getItem('catcafeCookiesAccept');
//     dispatch({
//       type: 'cookiesAccept',
//       payload: accepted
//     });
// }


// const iAcceptCookies = (dispatch) => () => {
//   localStorage.setItem('catcafeCookiesAccept','accepted');
//     dispatch({
//       type: 'cookiesAccept',
//       payload: true
//     });
// }

export const {Provider, Context} = createDataContext (
  authReducer,
  {authenticate,checkAuthed, setAuthed, setFormErrors},
//   { signin, signout, register, clearErrorMessage, tryLocalSignin, isAuthed,
//     forgotPassword, resetForgotPassword, changePassword, hasAcceptedCookies,
//     iAcceptCookies
//   },
  {...defaultState}
);