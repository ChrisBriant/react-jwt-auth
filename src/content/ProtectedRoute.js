import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {checkAuthed} from '../auth/auth';
import {Context as AuthContext} from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const {setAuthed} = useContext(AuthContext);

    if (!checkAuthed()) {
        // user is not authenticated
        setAuthed(false);
        return <Navigate to="/signin" />;
    } else {
        setAuthed(true);
    }
    return children;
};

export default ProtectedRoute;