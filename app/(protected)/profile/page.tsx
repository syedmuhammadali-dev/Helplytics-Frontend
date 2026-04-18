"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

import Header from "../../components/header/header";
import { readDemoSession } from "../../utils/auth-session";
import {
  getCurrentCommunityUser,
  updateCurrentUserProfile,
  useCommunityStore,
} from "../../utils/community-store";

export default function ProfilePage() {
  const session = readDemoSession();
  const state = useCommunityStore();
  const currentUser = getCurrentCommunityUser(state, session);
  const [name, setName] = useState(currentUser.name);
  const [location, setLocation] = useState(currentUser.location);
  const [skills, setSkills] = useState(currentUser.skills.join(", "));
  const [interests, setInterests] = useState(currentUser.interests.join(", "));

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !location.trim()) {
      toast.error("Name and location are required.");
      return;
    }

    updateCurrentUserProfile(session, {
      name: name.trim(),
      location: location.trim(),
      skills: skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      interests: interests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    toast.success("Profile settings saved.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card-dark p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <span className="section-label !text-primary !mb-6">
              Member Profile
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              {currentUser.name}
            </h1>
            <p className="text-white/70 font-medium text-lg md:text-xl flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-sm">
                {currentUser.role}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span>{currentUser.location}</span>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
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
                      {currentUser.trustScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b border-black/5">
                    <span className="text-text-muted font-bold text-sm">
                      Contributions
                    </span>
                    <span className="text-2xl font-bold text-dark tracking-tight">
                      {currentUser.contributions}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="section-label text-text-muted opacity-60">
                      Skills
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {currentUser.skills.map((skill) => (
                        <span
                          key={skill}
                          className="tag tag-blue !px-4 !py-2 !text-xs !rounded-xl shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="section-label text-text-muted opacity-60">
                      Badges
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {currentUser.badges.map((badge) => (
                        <span
                          key={badge}
                          className="tag tag-green !px-4 !py-2 !text-xs !rounded-xl shadow-sm"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="premium-card h-full bg-bg-card border-none shadow-none">
                <span className="section-label text-primary">Edit Profile</span>
                <h2 className="text-3xl font-bold text-dark mb-10">
                  Update your identity
                </h2>

                <form className="flex flex-col gap-8" onSubmit={handleSave}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="section-label text-dark/60">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="section-label text-dark/60">
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">Skills</label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(event) => setSkills(event.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="section-label text-dark/60">
                      Interests
                    </label>
                    <textarea
                      rows={4}
                      value={interests}
                      onChange={(event) => setInterests(event.target.value)}
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary !py-4 !px-8 text-sm mt-6 shadow-xl"
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
