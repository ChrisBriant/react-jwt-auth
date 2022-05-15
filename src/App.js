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
