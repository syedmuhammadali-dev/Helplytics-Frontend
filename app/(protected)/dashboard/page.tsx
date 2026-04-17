"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,450", change: "+12.5%", trendingUp: true, icon: Users, color: "bg-blue-500" },
  { label: "Revenue", value: "$45,200", change: "+8.2%", trendingUp: true, icon: CreditCard, color: "bg-emerald-500" },
  { label: "Avg. Session", value: "24m 32s", change: "-3.1%", trendingUp: false, icon: Activity, color: "bg-purple-500" },
  { label: "Growth", value: "18.4%", change: "+2.4%", trendingUp: true, icon: TrendingUp, color: "bg-orange-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Admin! 👋</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trendingUp ? "text-emerald-500" : "text-red-500"}`}>
                {stat.change}
                {stat.trendingUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Payment from Client #{i}</p>
                    <p className="text-xs text-slate-500 mt-0.5">April {10 + i}, 2026 • 2:3{i} PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">+$250.00</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-500/20 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full -ml-12 -mb-12 blur-2xl" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
            <p className="text-indigo-100 text-sm leading-relaxed opacity-80">
              Get access to advanced analytics, unlimited team members, and custom branding.
            </p>
          </div>
          
          <button className="relative z-10 mt-8 bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all active:scale-[0.98]">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}
