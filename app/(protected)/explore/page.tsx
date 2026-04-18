"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Header from "../../components/header/header";
import Link from "next/link";

const feedRequests = [
  {
    category: "Web Development",
    urgency: "High",
    status: "Solved",
    title: "Need help",
    desc: "help needed",
    author: "Ayesha Khan",
    location: "Karachi • 1 helper interested",
  },
  {
    category: "Web Development",
    urgency: "High",
    status: "Solved",
    title: "Need help making my portfolio responsive before demo day",
    desc: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
    tags: ["HTML/CSS", "Responsive", "Portfolio"],
    author: "Sara Noor",
    location: "Karachi • 1 helper interested",
  },
  {
    category: "Design",
    urgency: "Medium",
    status: "Open",
    title: "Looking for Figma feedback on a volunteer event poster",
    desc: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
    tags: ["Figma", "Poster", "Design Review"],
    author: "Ayesha Khan",
    location: "Lahore • 1 helper interested",
  },
  {
    category: "Career",
    urgency: "Low",
    status: "Solved",
    title: "Need mock interview support for internship applications",
    desc: "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
    tags: ["Interview Prep", "Career", "Frontend"],
    author: "Sara Noor",
    location: "Remote • 2 helpers interested",
  },
];

export default function ExplorePage() {
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
            <span className="section-label text-primary">Explore / Feed</span>
            <h1 className="text-5xl font-bold mb-4 max-w-4xl">
              Browse help requests with filterable community context.
            </h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed max-w-3xl">
              Filter by category, urgency, skills, and location to surface the
              best matches.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column: Filters */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="premium-card bg-bg-card border-none shadow-none sticky top-32 p-8">
                <span className="section-label text-primary">Filters</span>
                <h2 className="text-4xl font-bold text-dark mb-10 tracking-tight">
                  Refine feed
                </h2>

                <form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Category
                    </label>
                    <div className="relative">
                      <select className="form-select">
                        <option>All categories</option>
                        <option>Web Development</option>
                        <option>Design</option>
                        <option>Career</option>
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Urgency
                    </label>
                    <div className="relative">
                      <select className="form-select">
                        <option>All levels</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">Skills</label>
                    <input
                      type="text"
                      placeholder="React, Figma, Git"
                      className="form-input"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Karachi, Remote"
                      className="form-input"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Feed */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {feedRequests.map((req, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="premium-card premium-card-hover p-10 flex flex-col gap-6 bg-white hover:shadow-2xl transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        <span className="tag tag-blue">{req.category}</span>
                        <span
                          className={`tag ${req.urgency === "High" ? "tag-red" : "tag-yellow"}`}
                        >
                          {req.urgency}
                        </span>
                        <span
                          className={`tag ${req.status === "Solved" ? "tag-green" : "tag-teal"}`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <Link
                        href={`/requests/${i}`}
                        className="px-6 py-2.5 rounded-2xl bg-bg-card text-xs font-bold text-dark hover:bg-dark hover:text-white transition-all"
                      >
                        Open details
                      </Link>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">
                        {req.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed mb-6 line-clamp-2">
                        {req.desc}
                      </p>

                      {req.tags && (
                        <div className="flex flex-wrap gap-2">
                          {req.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-xl bg-bg-card text-[11px] font-bold text-text-muted uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-dark text-lg leading-tight">
                          {req.author}
                        </div>
                        <div className="text-sm text-text-muted">
                          {req.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
