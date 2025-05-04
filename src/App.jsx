import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';
import Loader from './components/common/Loader';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import Footer from './components/footer/Footer';
import { CropProvider } from './context/CropContext';
import LandLeasing from './pages/LandLeasing/LandLeasing';
import LandLeasingDetails from './components/landLeasing/LandLeasingDetails';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Activate = lazy(() => import('./pages/Activate'));
const Profile = lazy(() => import('./pages/Profile'));

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <CropProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/land-leasing" element={<LandLeasing />} />
          <Route path="/land-leasing/:id" element={<LandLeasingDetails />} />
          
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="activate" element={<Activate />} />
          </Route>
        </Routes>
        <Footer />
      </Suspense>
    </CropProvider>
  );
}

export default App;