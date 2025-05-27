// src/components/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../common/Navbar";
import React from "react";
import PreHeader from "../preheader/PreHeader";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <PreHeader />
      <Navbar />
      <motion.main
        className="w-full px-4 py-6 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default MainLayout;
