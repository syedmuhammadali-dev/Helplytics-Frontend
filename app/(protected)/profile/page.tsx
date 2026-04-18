"use client";

import { motion } from "framer-motion";
import { Save } from "lucide-react";
import Header from "../../components/header/header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          {/* Profile Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card-dark p-12 relative overflow-hidden"
          >
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-primary/15 blur-[120px] rounded-full" />
            <span className="section-label text-primary">Member Profile</span>
            <h1 className="text-5xl font-bold mb-3">Ayesha Khan</h1>
            <p className="text-white/60 font-medium text-lg">Both • Karachi</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column: Skills and Reputation (2/5) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="premium-card h-full">
                <span className="section-label text-text-muted">
                  Public Profile
                </span>
                <h2 className="text-3xl font-bold text-dark mb-10">
                  Skills and reputation
                </h2>

                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between py-5 border-b border-black/5">
                    <span className="text-text-muted font-bold text-sm">
                      Trust score
                    </span>
                    <span className="text-2xl font-bold text-dark tracking-tight">
                      100%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b border-black/5">
                    <span className="text-text-muted font-bold text-sm">
                      Contributions
                    </span>
                    <span className="text-2xl font-bold text-dark tracking-tight">
                      35
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="section-label text-text-muted opacity-60">
                      Skills
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["Figma", "UI/UX", "HTML/CSS", "Career Guidance"].map(
                        (skill) => (
                          <span
                            key={skill}
                            className="tag tag-blue px-5 py-2.5"
                          >
                            {skill}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="section-label text-text-muted opacity-60">
                      Badges
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["Design Ally", "Fast Responder", "Top Mentor"].map(
                        (badge) => (
                          <span
                            key={badge}
                            className="tag tag-green px-5 py-2.5"
                          >
                            {badge}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Edit Profile (3/5) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="premium-card h-full bg-bg-card border-none shadow-none">
                <span className="section-label text-primary">Edit Profile</span>
                <h2 className="text-3xl font-bold text-dark mb-10">
                  Update your identity
                </h2>

                <form className="flex flex-col gap-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="section-label text-dark/60">Name</label>
                      <input
                        type="text"
                        defaultValue="Ayesha Khan"
                        className="form-input"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="section-label text-dark/60">
                        Location
                      </label>
                      <input
                        type="text"
                        defaultValue="Karachi"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">Skills</label>
                    <input
                      type="text"
                      defaultValue="Figma, UI/UX, HTML/CSS, Career Guidance"
                      className="form-input"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Interests
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Hackathons, UI/UX, Community Building"
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-primary py-5 text-base mt-4 shadow-lg shadow-primary/20"
                  >
                    <Save size={18} />
                    Save profile settings
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
