import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AppRoutes from './AppRoutes';

const AuthProvid = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default AuthProvid;