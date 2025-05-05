import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';
import Loader from './components/common/Loader';
import AuthLayout from './components/layout/AuthLayout';
import Footer from './components/footer/Footer';
import { CropProvider } from './context/CropContext';
import { AuthProvider } from './context/AuthContext';
import LandLeasing from './pages/LandLeasing/LandLeasing';
import LandLeasingDetails from './components/landLeasing/LandLeasingDetails';
import RentalEquipmentDetails from './pages/rentalEquipment/RentalEquimentDetials';
import RentalEquipment from './pages/rentalEquipment/RentalEquipment';
import CropPrediction from './pages/cropPrediction/cropPrediciton';
import Dashboard from './pages/dashboard/Dashboard';
import Chat from './pages/chat/Chat';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <AuthProvider>
      <CropProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Main Layout Routes */}
              <Route
                path='/'
                element={<MainLayout />}>
                <Route
                  index
                  element={<Home />}
                />
                <Route
                  path='/land-leasing'
                  element={<LandLeasing />}
                />
                <Route
                  path='/land-leasing/:id'
                  element={<LandLeasingDetails />}
                />
                <Route
                  path='/rental-equipment'
                  element={<RentalEquipment />}
                />
                <Route
                  path='/rental-equipment/:id'
                  element={<RentalEquipmentDetails />}
                />
                <Route
                  path='/crop-prediction'
                  element={<CropPrediction />}
                />
                <Route
                  path='/dashboard'
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/chat'
                  element={<Chat />}
                />
                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Auth Layout Routes */}
              <Route
                path='/'
                element={<AuthLayout />}>
                <Route
                  path='login'
                  element={<Login />}
                />
                <Route
                  path='register'
                  element={<Register />}
                />
              </Route>
            </Routes>
            <Footer />
          </Suspense>
      </CropProvider>
    </AuthProvider>
  );
}

export default App;
