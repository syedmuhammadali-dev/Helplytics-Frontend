"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import Header from "../../../components/header/header";

export default function RequestDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-bold text-sm group w-fit"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to explore feed
          </Link>

          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card-dark p-12 relative overflow-hidden"
          >
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-primary/15 blur-[120px] rounded-full" />
            <div className="flex flex-wrap gap-2 mb-8 relative z-10">
              <span className="tag tag-blue opacity-90">Career</span>
              <span className="tag tag-yellow opacity-90">Low</span>
              <span className="tag tag-green opacity-90">Solved</span>
            </div>
            <span className="section-label text-primary">Request Detail</span>
            <h1 className="text-5xl font-bold mb-6 max-w-4xl leading-tight">
              Need mock interview support for internship applications
            </h1>
            <p className="text-white/60 font-medium max-w-3xl text-xl leading-relaxed">
              Applying to frontend internships and need someone to practice
              behavioral and technical interview questions with me.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* AI Summary */}
              <div className="premium-card">
                <span className="section-label text-primary">
                  AI Contextual Summary
                </span>
                <p className="text-dark font-bold text-xl leading-relaxed mb-8">
                  Applying for frontend internships and need someone to practice
                  behavioral and technical interview questions with me.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Interview Prep", "Career", "Frontend"].map((tag) => (
                    <span
                      key={tag}
                      className="tag tag-blue px-6 py-2.5 font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="premium-card bg-bg-card border-none shadow-none">
                <span className="section-label text-primary">
                  Community Actions
                </span>
                <div className="flex flex-wrap gap-4 mt-4">
                  <button className="btn-primary py-5 px-12 text-base shadow-lg shadow-primary/20">
                    I can help
                  </button>
                  <button className="btn-secondary py-5 px-12 text-base">
                    Mark as solved
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Requester */}
              <div className="premium-card bg-bg-card border-none shadow-none p-10">
                <span className="section-label text-primary">Requester</span>
                <div className="flex items-center gap-5 mt-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    SN
                  </div>
                  <div>
                    <div className="font-bold text-dark text-xl leading-tight">
                      Sara Noor
                    </div>
                    <div className="text-text-muted text-sm font-medium mt-1">
                      Karachi • 2 helpers interested
                    </div>
                  </div>
                </div>
              </div>

              {/* Helpers */}
              <div className="premium-card p-10">
                <span className="section-label text-text-muted opacity-60">
                  Helper Pool
                </span>
                <h3 className="text-2xl font-bold text-dark mb-8">
                  People ready to support
                </h3>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: "Ayesha Khan",
                      skills: "Figma, UI/UX, HTML/CSS",
                      trust: "100%",
                      avatar: "AK",
                      color: "bg-orange-600",
                    },
                    {
                      name: "Hassan Ali",
                      skills: "JavaScript, React, Git/GitHub",
                      trust: "88%",
                      avatar: "HA",
                      color: "bg-dark",
                    },
                  ].map((helper, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-[1.5rem] bg-bg-card border border-black/5 flex flex-col gap-4 group hover:bg-white hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 ${helper.color} rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md`}
                          >
                            {helper.avatar}
                          </div>
                          <div className="font-bold text-dark group-hover:text-primary transition-colors">
                            {helper.name}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white text-[10px] font-bold text-primary border border-primary/10 shadow-sm uppercase tracking-widest">
                          Trust {helper.trust}
                        </div>
                      </div>
                      <div className="text-[11px] font-bold text-text-muted uppercase tracking-tight">
                        {helper.skills}
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
