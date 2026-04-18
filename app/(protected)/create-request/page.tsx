"use client";

import { motion } from "framer-motion";
import { Send, ChevronDown, Wand2 } from "lucide-react";
import Header from "../../components/header/header";

export default function CreateRequestPage() {
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
            <span className="section-label text-primary">Create Request</span>
            <h1 className="text-5xl font-bold mb-4 max-w-4xl">
              Turn a rough problem into a clear help request.
            </h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed max-w-3xl">
              Use built-in AI suggestions for category, urgency, tags, and a
              stronger description rewrite.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="premium-card h-full bg-white">
                <form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">Title</label>
                    <input
                      type="text"
                      placeholder="Need review on my JavaScript quiz app before submission"
                      className="form-input form-input-muted"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                      className="form-input form-input-muted resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="section-label text-dark/60">Tags</label>
                      <input
                        type="text"
                        placeholder="JavaScript, Debugging, Review"
                        className="form-input form-input-muted"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="section-label text-dark/60">
                        Category
                      </label>
                      <div className="relative">
                        <select className="form-select form-input-muted">
                          <option>Web Development</option>
                          <option>Design</option>
                          <option>Career</option>
                        </select>
                        <ChevronDown
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                          size={18}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Urgency
                    </label>
                    <div className="relative">
                      <select className="form-select form-input-muted">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      <ChevronDown
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="button"
                      className="btn-secondary py-4 px-10 text-sm flex items-center gap-2 group"
                    >
                      <Wand2
                        size={16}
                        className="text-primary group-hover:rotate-12 transition-transform"
                      />
                      Apply AI suggestions
                    </button>
                    <button
                      type="submit"
                      className="btn-primary py-4 px-10 text-sm shadow-lg shadow-primary/20"
                    >
                      <Send size={16} />
                      Publish request
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: AI Assistant */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="premium-card h-full bg-bg-card border-none shadow-none p-12">
                <span className="section-label text-primary">AI Assistant</span>
                <h2 className="text-4xl font-bold text-dark mb-12 leading-tight">
                  Smart request guidance
                </h2>

                <div className="flex flex-col gap-8">
                  {[
                    { label: "Suggested category", value: "Community" },
                    { label: "Detected urgency", value: "Low" },
                    {
                      label: "Suggested tags",
                      value: "Add more detail for smarter tags",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-5 border-b border-black/5"
                    >
                      <span className="text-text-muted font-bold text-sm">
                        {item.label}
                      </span>
                      <span className="font-bold text-dark text-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}

                  <div className="flex flex-col gap-4 py-5">
                    <span className="section-label text-text-muted opacity-60">
                      Rewrite suggestion
                    </span>
                    <p className="text-dark font-bold text-base leading-relaxed">
                      Start describing the challenge to generate a stronger
                      version of your request.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
