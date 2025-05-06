import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import FarmingLoader from './components/loader/FarmingLoader';
import AuthLayout from './components/layout/AuthLayout';
import Footer from './components/footer/Footer';
import { CropProvider } from './context/CropContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LeasingProvider } from './context/LeasingContext';
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
const ListLand = lazy(() => import('./pages/LandLeasing/ListLand'));
const ShopLogin = lazy(() => import('./pages/Shop/Auth/ShopLogin'));
const ShopRegister = lazy(() => import('./pages/Shop/Auth/ShopRegister'));
const ShopActivation = lazy(() => import('./pages/Shop/Auth/ShopActivation'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Checkout = lazy(() => import('./pages/checkout/Checkout'));
const OrderSummary = lazy(() => import('./pages/order/OrderSummary'));

function App() {
  return (
    <AuthProvider>
      <CropProvider>
        <CartProvider>
          <LeasingProvider>
            <Suspense fallback={<FarmingLoader />}>
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
                  <Route
                    path='/land-leasing/list'
                    element={<ListLand />}
                  />
                  {/* Add these new cart-related routes */}
                  <Route
                    path='/cart'
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/checkout'
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/order-summary'
                    element={
                      <ProtectedRoute>
                        <OrderSummary />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Auth Layout Routes */}
                <Route
                  path='/'
                  element={<MainLayout />}>
                  <Route
                    path='login'
                    element={<Login />}
                  />
                  <Route
                    path='register'
                    element={<Register />}
                  />
                </Route>
                <Route
                  path='/shop'
                  element={<MainLayout />}>
                  {/* Shop Routes */}
                  <Route
                    path='/shop/login'
                    element={<ShopLogin />}
                  />
                  <Route
                    path='/shop/register'
                    element={<ShopRegister />}
                  />

                  <Route
                    path='/shop/activation'
                    element={<ShopActivation />}
                  />
                </Route>
              </Routes>
              <Footer />
            </Suspense>
          </LeasingProvider>
        </CartProvider>
      </CropProvider>
    </AuthProvider>
  );
}

export default App;
