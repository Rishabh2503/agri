import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';
import Loader from './components/common/Loader';
import AuthLayout from './components/layout/AuthLayout';
import Footer from './components/footer/Footer';
import { CropProvider } from './context/CropContext';
import LandLeasing from './pages/LandLeasing/LandLeasing';
import LandLeasingDetails from './components/landLeasing/LandLeasingDetails';
import RentalEquipmentDetails from './pages/rentalEquipment/RentalEquimentDetials';
import RentalEquipment from './pages/rentalEquipment/RentalEquipment';
import CropPrediction from './pages/cropPrediction/cropPrediciton';
import Dashboard from './pages/dashboard/Dashboard';
import Chat from './pages/chat/Chat';
import MainLayout from './components/layout/MainLayout';

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
            <Route path="/rental-equipment" element={<RentalEquipment />} />
            <Route path="/rental-equipment/:id" element={<RentalEquipmentDetails />} />
            <Route path="/crop-prediction" element={<CropPrediction />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/add-product" element={<AddProduct />} /> */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={
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