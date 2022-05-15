import { Outlet, Link } from "react-router-dom";
//import Header from "./Header";


const Layout = () => {
    // const {checkAuthed,state:{authed}} = useContext(AuthContext);

    // useEffect(() => {
    //     checkAuthed();
    // },[authed]);

    return(
        <>
            <nav id="main-nav">
                <div className="navBar">
                    <p className="logo">YamYamGo</p>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/page1">Page 1</Link></li>
                    </ul>
                </div>
            </nav>
            <Outlet />
            {/* {
                authed
                ? <Outlet />
                : <SignIn />
            } */}
        </>
    )
}

export default Layout;