import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './Main'
import {Provider as AuthProvider} from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <Main />
    </AuthProvider>
  );
}

export default App;
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
