"use client";

import { motion } from "framer-motion";
import { Send, Search, ChevronDown, User, MessageCircle } from "lucide-react";
import Header from "../../components/header/header";

const messages = [
  {
    from: "Ayesha Khan",
    to: "Sara Noor",
    text: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
    time: "09:45 AM",
  },
  {
    from: "Hassan Ali",
    to: "Ayesha Khan",
    text: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
    time: "11:10 AM",
  },
];

export default function MessagesPage() {
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
            <span className="section-label text-primary">
              Interaction / Messaging
            </span>
            <h1 className="text-5xl font-bold mb-4 max-w-3xl">
              Keep support moving through direct communication.
            </h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed">
              Basic messaging gives helpers and requesters a clear follow-up
              path once a match happens.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column: Recent Messages (3/5) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="premium-card h-full">
                <span className="section-label text-text-muted">
                  Conversation Stream
                </span>
                <h2 className="text-3xl font-bold text-dark mb-10">
                  Recent messages
                </h2>

                <div className="flex flex-col gap-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className="p-8 rounded-[2rem] bg-bg-card border border-black/5 hover:bg-white hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-dark group-hover:text-primary transition-colors">
                            {msg.from}
                          </span>
                          <span className="text-text-muted">→</span>
                          <span className="font-bold text-dark">{msg.to}</span>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-white text-[10px] font-bold text-primary border border-primary/10 shadow-sm">
                          {msg.time}
                        </div>
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed group-hover:text-dark transition-colors">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Start Conversation (2/5) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="premium-card h-full bg-bg-card border-none shadow-none">
                <span className="section-label text-primary">Send Message</span>
                <h2 className="text-3xl font-bold text-dark mb-10">
                  Start a conversation
                </h2>

                <form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">To</label>
                    <div className="relative">
                      <select className="form-select">
                        <option>Ayesha Khan</option>
                        <option>Sara Noor</option>
                        <option>Hassan Ali</option>
                      </select>
                      <ChevronDown
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Share support details, ask for files, or suggest next steps."
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-primary w-full justify-center py-5 text-base mt-4 shadow-lg shadow-primary/20"
                  >
                    <Send size={18} />
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
