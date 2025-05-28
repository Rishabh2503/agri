import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import { getCurrentShop } from '../../../services/authService';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ShopDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const response = await getCurrentShop();
        if (response.success) {
          const shopData = response.shop;
          setStats({
            totalProducts: shopData?.products?.length || 0,
            totalOrders: shopData?.orders?.length || 0,
            totalCustomers: shopData?.customers?.length || 0,
            totalRevenue: shopData?.totalRevenue || 0
          });
        } else {
          toast.error(response.message || 'Failed to fetch shop data');
          // Set default stats if fetch fails
          setStats({
            totalProducts: 0,
            totalOrders: 0,
            totalCustomers: 0,
            totalRevenue: 0
          });
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
        toast.error(error.message || 'Failed to fetch shop data. Please try again later.');
        // Set default stats if fetch fails
        setStats({
          totalProducts: 0,
          totalOrders: 0,
          totalCustomers: 0,
          totalRevenue: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Welcome back, {user?.name}!
          </motion.h1>
          <div className="flex space-x-4">
            <Link
              to="/shop/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPackage className="mr-2" />
              View Products
            </Link>
            <Link
              to="/shop/create-product"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FiPlus className="mr-2" />
              Create Product
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={<FiPackage className="w-6 h-6" />}
              color="bg-blue-500"
            />
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={<FiShoppingBag className="w-6 h-6" />}
              color="bg-green-500"
            />
            <StatCard
              title="Total Customers"
              value={stats.totalCustomers}
              icon={<FiUsers className="w-6 h-6" />}
              color="bg-purple-500"
            />
            <StatCard
              title="Total Revenue"
              value={`₹${stats.totalRevenue.toLocaleString()}`}
              icon={<FiDollarSign className="w-6 h-6" />}
              color="bg-yellow-500"
            />
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add your recent activity items here */}
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default ShopDashboard; 