import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {Context as AuthContext} from '../context/AuthContext';

const Layout = () => {
    const {setAuthed,state:{authed}} = useContext(AuthContext);

    console.log(authed);

    return(
        <>
            <nav id="main-nav">
                <div className="navBar">
                    <p className="logo">Logo</p>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/page1">Page 1</Link></li>
                            <li><Link to="/signout">Sign Out</Link></li>
                        </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;