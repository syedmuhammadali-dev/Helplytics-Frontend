"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();

  if (!pathname) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </main>
  );
};

export default ClientLayout;
