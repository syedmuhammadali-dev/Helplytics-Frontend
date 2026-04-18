"use client";

import "react-toastify/dist/ReactToastify.css";

import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { ensureCommunitySeeded } from "./utils/community-store";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();

  useEffect(() => {
    ensureCommunitySeeded();
  }, []);

  if (!pathname) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
      <ToastContainer
        position="bottom-right"
        autoClose={2200}
        hideProgressBar
        newestOnTop
        closeButton={false}
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default ClientLayout;
