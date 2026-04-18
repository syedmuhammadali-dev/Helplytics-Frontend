"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertCircle, Users, ArrowRight } from "lucide-react";
import Header from "../../components/header/header";

const insights = [
  {
    label: "Trend Pulse",
    value: "Web Development",
    desc: "Most common support area based on active community requests."
  },
  {
    label: "Urgency Watch",
    value: "2",
    desc: "Requests currently flagged high priority by the urgency detector."
  },
  {
    label: "Mentor Pool",
    value: "2",
    desc: "Trusted helpers with strong response history and contribution signals."
  }
];

const recommendations = [
  {
    title: "Need help",
    summary: "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.",
    tags: [{ label: "Web Development", type: "blue" }, { label: "High", type: "red" }]
  },
  {
    title: "Need help making my portfolio responsive before demo day",
    summary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
    tags: [{ label: "Web Development", type: "blue" }, { label: "High", type: "red" }]
  },
  {
    title: "Looking for Figma feedback on a volunteer event poster",
    summary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
    tags: [{ label: "Design", type: "blue" }, { label: "Medium", type: "yellow" }]
  },
  {
    title: "Need mock interview support for internship applications",
    summary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.",
    tags: [{ label: "Career", type: "blue" }, { label: "Low", type: "teal" }]
  }
];

export default function AICenterPage() {
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
            <span className="section-label text-primary">AI Center</span>
            <h1 className="text-5xl font-bold mb-4 max-w-3xl">See what the platform intelligence is noticing.</h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed">AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.</p>
          </motion.div>

          {/* Pulse Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {insights.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="premium-card border-none bg-white/50 p-8"
              >
                <span className="section-label text-text-muted opacity-60">{item.label}</span>
                <div className="text-3xl font-bold text-dark mb-3">{item.value}</div>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="premium-card p-12">
            <span className="section-label text-primary">AI Recommendations</span>
            <h2 className="text-4xl font-bold text-dark mb-12">Requests needing attention</h2>
            
            <div className="flex flex-col gap-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-bg-card border border-black/5 hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
                  <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">{rec.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{rec.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    {rec.tags.map((tag, j) => (
                      <span key={j} className={`tag tag-${tag.type}`}>{tag.label}</span>
                    ))}
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
