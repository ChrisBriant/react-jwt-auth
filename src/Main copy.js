import {useEffect,useContext} from 'react';
import {Context as AuthContext} from './context/AuthContext';
import { Routes, Route, Outlet} from "react-router-dom";
import SignIn from './unauthed-content/SingIn';
import Home from './authed-content/Home';
import Page1 from './authed-content//Page1';
import AuthedLayout from './authed-content/AuthedLayout';
import UnauthedLayout from './unauthed-content/UnauthedLayout';
import Layout from './content/Layout';


const Main = () => {
    const {checkAuthed,state:{authed}} = useContext(AuthContext);

    useEffect(() => {
        checkAuthed();
    },[authed]);

    return (
        <div>
            {   
                authed 
                ? <>
                    <Routes>
                        <Route path="/" element={<AuthedLayout />}>
                            <Route index element={<Home />} />
                            <Route path="/page1" element={<Page1 />} />
                        </Route>
                    </Routes>
                    <Outlet />
                </>
                : <>
                    <Routes>
                        <Route path="/" element={<UnauthedLayout />}>
                            <Route index element={<SignIn />} />
                        </Route>
                    </Routes>
                    <Outlet />
                </>
            }
        </div>
    );
}


export default Main;