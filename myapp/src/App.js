import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/AuthContext';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignUpForm';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Acounts from './pages/acounts';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Categories from './pages/categories';
import Transaction from './pages/transactions';
import UpdateAcount from './modals/updateaccount';
import Notification from './pages/notification';
import Transformation from './pages/Transformation';
import Budget from './pages/budget';
import Admin from './pages/Admin';
function ProtectedLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />

      {/* Protected */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/acounts" element={<Acounts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/updateaccount/:id" element={<UpdateAcount />} />
        <Route path="/notification/:id" element={<Notification />} />
        <Route path="/transformation" element={<Transformation />} />
        <Route path="/budget" element={<Budget />} />
         <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
