import { Navigate } from "react-router-dom";
import {useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {checkAuthed} from '../auth/auth';

export const ProtectedRoute = ({ children }) => {
    const {setAuthed} = useContext(AuthContext);

    // const checkAuthed = () => {
    //     const accessToken = localStorage.getItem('access_token');
    //     console.log(accessToken);
    //     if(accessToken) {
    //       const decoded = decode(accessToken);
    //       const tokenExpiry = new Date(decoded.exp*1000);
    //       const now = new Date();
    //       console.log(now < tokenExpiry, now, tokenExpiry);
    //       if(now < tokenExpiry) {
    //         //setAuthed(true);
    //         return true;
    //       } else {
    //         //setAuthed(false);
    //         return false;
    //       }
    //     } else {
    //       //setAuthed(false);
    //       return false;
    //     }
    //   }

    //async () => { await console.log(checkAuthed()) };

    if (!checkAuthed()) {
        // user is not authenticated
        return <Navigate to="/signin" />;
    }
    return children;
};

export default ProtectedRoute;