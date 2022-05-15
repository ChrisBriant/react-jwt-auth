
import { Navigate } from "react-router-dom";
import {signOut} from '../auth/auth';

const SignOut = () => {
    signOut();

    return (
        <Navigate to="/signin" replace={true} />
    );
}

export default SignOut;