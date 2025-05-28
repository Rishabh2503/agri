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
const ShopDashboard = lazy(() => import('./pages/Shop/Dashboard/ShopDashboard'));
const ShopProducts = lazy(() => import('./pages/Shop/Products/ShopProducts'));
const AllShopProducts = lazy(() => import('./pages/Shop/Products/AllShopProducts'));
const CreateProduct = lazy(() => import('./pages/Shop/Products/CreateProduct'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Checkout = lazy(() => import('./pages/checkout/Checkout'));
const OrderSummary = lazy(() => import('./pages/order/OrderSummary'));
const UserActivation = lazy(() => import('./pages/UserActivation'));

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
                  <Route
                    path='activation/:activation_token'
                    element={<UserActivation />}
                  />
                </Route>

                {/* Shop Routes */}
                <Route
                  path='/shop'
                  element={<MainLayout />}>
                  <Route
                    path='login'
                    element={<ShopLogin />}
                  />
                  <Route
                    path='register'
                    element={<ShopRegister />}
                  />
                  <Route
                    path='activation/:activation_token'
                    element={<ShopActivation />}
                  />
                  <Route
                    path='dashboard'
                    element={
                      <ProtectedRoute>
                        <ShopDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='products'
                    element={
                      <ProtectedRoute>
                        <ShopProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='all-products'
                    element={<AllShopProducts />}
                  />
                  <Route
                    path='create-product'
                    element={
                      <ProtectedRoute>
                        <CreateProduct />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Shop Owner Routes - Alias for Shop Routes */}
                <Route
                  path='/seller'
                  element={<MainLayout />}>
                  <Route
                    path='activation/:activation_token'
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
