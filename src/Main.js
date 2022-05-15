import { Routes, Route} from "react-router-dom";
import SignIn from './content/SignIn';
import Home from './content/Home';
import Page1 from './content//Page1';
import Layout from './content/Layout';
import ProtectedRoute from './content/ProtectedRoute';


const Main = () => {


    return (
        <div>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            
                            <Route path="/page1" element={<ProtectedRoute><Page1 /></ProtectedRoute>} />
                            <Route path="/signin" element={<SignIn />} />
                        </Route>
                    </Routes>
        </div>
    );
}


export default Main;