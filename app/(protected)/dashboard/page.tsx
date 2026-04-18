"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Bell,
  PlusCircle,
  Search,
  Compass,
} from "lucide-react";
import Header from "../../components/header/header";

const stats = [
  {
    label: "Active Requests",
    value: "12",
    desc: "Open help requests in the community feed.",
    icon: MessageSquare,
  },
  {
    label: "Helpers Online",
    value: "8",
    desc: "Community members available to assist right now.",
    icon: Users,
  },
  {
    label: "Solved This Week",
    value: "5",
    desc: "Problems resolved through fast community action.",
    icon: CheckCircle,
  },
  {
    label: "Trust Score",
    value: "100%",
    desc: "Your current reliability rating in the network.",
    icon: TrendingUp,
  },
];

const recentActivity = [
  {
    text: '"Need help" was marked as solved',
    type: "Status",
    time: "2 min ago",
  },
  {
    text: "Sara Noor offered help on your portfolio request",
    type: "Match",
    time: "15 min ago",
  },
  {
    text: "Your trust score increased after a solved request",
    type: "Reputation",
    time: "1 hr ago",
  },
  {
    text: "AI Center detected rising demand for interview prep",
    type: "Insight",
    time: "3 hr ago",
  },
];

const quickLinks = [
  {
    label: "Create Request",
    href: "/create-request",
    icon: PlusCircle,
    desc: "Post a new help request",
  },
  {
    label: "Explore Feed",
    href: "/explore",
    icon: Compass,
    desc: "Browse community requests",
  },
  {
    label: "AI Center",
    href: "/ai-center",
    icon: Sparkles,
    desc: "See platform intelligence",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    desc: "Check your updates",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card-dark p-12 relative overflow-hidden"
          >
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-primary/15 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
            <span className="section-label text-primary">Dashboard</span>
            <h1 className="text-5xl font-bold mb-4 max-w-3xl">
              Welcome back, Ayesha.
            </h1>
            <p className="text-white/60 font-medium text-lg max-w-2xl">
              Here&apos;s what&apos;s happening across your community network
              today. Track your impact, check matches, and keep the momentum
              going.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="premium-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon size={20} className="text-primary" />
                  </div>
                </div>
                <span className="section-label text-text-muted">
                  {stat.label}
                </span>
                <div className="text-3xl font-bold text-dark mt-1 mb-2">
                  {stat.value}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-3">
              <div className="premium-card h-full">
                <span className="section-label text-primary">
                  Recent Activity
                </span>
                <h2 className="text-3xl font-bold text-dark mb-8">
                  Latest updates
                </h2>
                <div className="flex flex-col gap-3">
                  {recentActivity.map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-bg-card hover:bg-white hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-dark group-hover:text-primary transition-colors">
                          {item.text}
                        </span>
                        <span className="text-text-muted text-xs">
                          {item.type} • {item.time}
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <div className="premium-card-muted h-full">
                <span className="section-label text-primary">Quick Access</span>
                <h2 className="text-3xl font-bold text-dark mb-8">
                  Jump to action
                </h2>
                <div className="flex flex-col gap-3">
                  {quickLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="p-5 rounded-2xl bg-white hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                    >
                      <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <link.icon size={20} className="text-primary" />
                      </div>
                      <div className="flex-grow">
                        <span className="font-bold text-dark text-sm group-hover:text-primary transition-colors block">
                          {link.label}
                        </span>
                        <span className="text-text-muted text-xs">
                          {link.desc}
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-text-muted opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
