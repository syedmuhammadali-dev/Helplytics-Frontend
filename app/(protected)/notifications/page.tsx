"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle, MessageSquare, PlusCircle, TrendingUp, Sparkles } from "lucide-react";
import Header from "../../components/header/header";

const notifications = [
  { text: "\"Need help\" was marked as solved", type: "Status", time: "Just now", unread: true },
  { text: "Ayesha Khan offered help on \"Need help\"", type: "Match", time: "Just now", unread: true },
  { text: "Your request \"Need help\" is now live in the community feed", type: "Request", time: "Just now", unread: true },
  { text: "\"Need help making my portfolio responsive before demo day\" was marked as solved", type: "Status", time: "Just now", unread: true },
  { text: "New helper matched to your responsive portfolio request", type: "Match", time: "12 min ago", unread: true },
  { text: "Your trust score increased after a solved request", type: "Reputation", time: "1 hr ago", unread: true },
  { text: "AI Center detected rising demand for interview prep", type: "Insight", time: "Today", unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          
          {/* Header Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card-dark p-12 relative overflow-hidden"
          >
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-primary/15 blur-[120px] rounded-full" />
            <span className="section-label text-primary">Notifications</span>
            <h1 className="text-5xl font-bold mb-4 max-w-4xl">Stay updated on requests, helpers, and trust signals.</h1>
          </motion.div>

          {/* Notification Feed */}
          <div className="premium-card p-12">
            <span className="section-label text-text-muted">Live Updates</span>
            <h2 className="text-4xl font-bold text-dark mb-10">Notification feed</h2>
            
            <div className="flex flex-col gap-3">
              {notifications.map((notif, i) => (
                <div key={i} className="p-6 rounded-[1.5rem] bg-bg-card border border-black/5 hover:bg-white hover:shadow-lg transition-all cursor-pointer flex items-center justify-between group">
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-dark text-lg group-hover:text-primary transition-colors">{notif.text}</div>
                    <div className="text-text-muted text-xs font-medium uppercase tracking-tight">{notif.type} • {notif.time}</div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${notif.unread ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-text-muted opacity-40"}`}>
                    {notif.unread ? "Unread" : "Read"}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
