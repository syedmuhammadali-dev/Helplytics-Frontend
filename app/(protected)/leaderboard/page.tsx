"use client";

import { motion } from "framer-motion";
import Header from "../../components/header/header";

const rankings = [
  {
    id: 2,
    name: "Hassan Ali",
    skills: "JavaScript, React, Git/GitHub",
    trust: "88%",
    contributions: 24,
    avatar: "HA",
    color: "bg-dark",
  },
  {
    id: 3,
    name: "Sara Noor",
    skills: "Python, Data Analysis",
    trust: "74%",
    contributions: 11,
    avatar: "SN",
    color: "bg-orange-500",
  },
];

const badges = [
  { name: "Hassan Ali", role: "Code Rescuer • Bug Hunter", progress: 85 },
  { name: "Sara Noor", role: "Community Voice", progress: 65 },
];

export default function LeaderboardPage() {
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
            <span className="section-label text-primary">Leaderboard</span>
            <h1 className="text-5xl font-bold mb-4 max-w-4xl">
              Recognize the people who keep the community moving.
            </h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed">
              Trust score, contribution count, and badges create visible
              momentum for reliable helpers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Rankings */}
            <div className="flex flex-col gap-6">
              <div className="premium-card h-full">
                <span className="section-label text-text-muted">
                  Top Helpers
                </span>
                <h2 className="text-4xl font-bold text-dark mb-10">Rankings</h2>

                <div className="flex flex-col gap-4">
                  {rankings.map((user) => (
                    <div
                      key={user.id}
                      className="p-8 rounded-[2rem] bg-bg-card border border-black/5 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-16 h-16 ${user.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-dark text-xl">
                            #{user.id} {user.name}
                          </div>
                          <div className="text-text-muted text-sm">
                            {user.skills}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-dark text-xl tracking-tight">
                          {user.trust}
                        </div>
                        <div className="text-text-muted text-[11px] uppercase font-bold tracking-widest">
                          {user.contributions} contributions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Badge System */}
            <div className="flex flex-col gap-6">
              <div className="premium-card h-full">
                <span className="section-label text-primary">Badge System</span>
                <h2 className="text-4xl font-bold text-dark mb-10">
                  Trust and achievement
                </h2>

                <div className="flex flex-col gap-10">
                  {badges.map((user, i) => (
                    <div key={i} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-dark text-2xl">
                          {user.name}
                        </div>
                        <div className="text-text-muted font-medium">
                          {user.role}
                        </div>
                      </div>
                      <div className="w-full h-4 bg-bg-card rounded-full overflow-hidden border border-black/5 p-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${user.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary rounded-full shadow-sm shadow-primary/20"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-text-muted">
                        <span>Progress to next badge</span>
                        <span>{user.progress}%</span>
                      </div>
                    </div>
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
