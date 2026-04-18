"use client";

import { Bell, Search, ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
          <HelpCircle size={20} />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-xl transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-500/10">
            AD
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">
              Admin User
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Super Admin</p>
          </div>
          <ChevronDown
            size={16}
            className="text-slate-400 group-hover:text-slate-600 transition-colors"
          />
        </motion.button>
      </div>
    </header>
  );
}
