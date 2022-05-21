import {useEffect,useState} from 'react';
import { Navigate } from "react-router-dom";
import {checkAuthed} from '../auth/auth';





export const ProtectedRoute = ({ children }) => {
    // const isAuthed = checkAuthedWrapper();
    // console.log('AM I AUTHED', isAuthed);

    const [authed,setAuthed] = useState(true);

    useEffect(() => {
        checkAuthed().then((response) => {
            console.log('AM I AUTHED', authed);
            if(response) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        });
    },[]);

    console.log(authed);

    if(!authed) {
        return <Navigate to="/signin" />;
    } else {
        return children;
    }
    // if (!isAuthed) {
    //     // user is not authenticated
    //     console.log('AM I AUTHED NOW', isAuthed);
        
    // } 
    // return children;
};

export default ProtectedRoute;