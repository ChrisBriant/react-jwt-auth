import { Navigate } from "react-router-dom";
import {checkAuthed} from '../auth/auth';

export const ProtectedRoute = ({ children }) => {

    if (!checkAuthed()) {
        // user is not authenticated
        return <Navigate to="/signin" />;
    } 
    return children;
};

export default ProtectedRoute;