import { Outlet, Link } from "react-router-dom";

const HeaderAuthed = () => {
    return (
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
    );
    
}

export default HeaderAuthed;