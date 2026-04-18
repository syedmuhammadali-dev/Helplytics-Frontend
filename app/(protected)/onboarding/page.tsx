"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, User, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "../../components/header/header";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => setStep(step + 1);
  const finish = () => router.push("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-12">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s === step ? "w-12 bg-primary" : s < step ? "w-8 bg-primary/40" : "w-8 bg-black/5"
                }`}
              />
            ))}
          </div>

          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="premium-card p-12 lg:p-16 bg-white shadow-2xl shadow-black/5"
          >
            {step === 1 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <span className="section-label text-primary">Step 01 / Identity</span>
                  <h1 className="text-5xl font-bold text-dark leading-tight">Welcome to the<br />community, friend.</h1>
                  <p className="text-text-muted text-lg max-w-2xl">Let's start by setting up your basic profile information so people know who they're helping.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Display Name</label>
                    <div className="relative">
                      <input type="text" className="form-input pl-12" placeholder="e.g. Ayesha Khan" />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Your Location</label>
                    <div className="relative">
                      <input type="text" className="form-input pl-12" placeholder="e.g. Karachi, PK" />
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                    </div>
                  </div>
                </div>

                <button onClick={nextStep} className="btn-primary self-end py-4 px-12 text-base group">
                  Next step
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <span className="section-label text-primary">Step 02 / Expertise</span>
                  <h1 className="text-5xl font-bold text-dark leading-tight">What do you bring<br />to the table?</h1>
                  <p className="text-text-muted text-lg max-w-2xl">Select the skills you can offer help with, or the areas where you're looking to grow.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {["React", "Node.js", "Figma", "UI/UX", "Python", "Data Science", "AWS", "DevOps", "Next.js", "Tailwind"].map(skill => (
                    <button 
                      key={skill}
                      className="px-6 py-3 rounded-2xl bg-bg-card border border-black/5 font-bold text-dark hover:border-primary/40 hover:bg-white transition-all"
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button onClick={() => setStep(1)} className="text-text-muted font-bold hover:text-dark transition-colors">Back</button>
                  <button onClick={nextStep} className="btn-primary py-4 px-12 text-base group">
                    Continue
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-10 text-center items-center">
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary mb-4">
                  <Sparkles size={48} />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="section-label text-primary mx-auto">Step 03 / Ready</span>
                  <h1 className="text-5xl font-bold text-dark leading-tight">You're all set!</h1>
                  <p className="text-text-muted text-lg max-w-xl mx-auto">Your community profile is ready. You can now start exploring requests or posting your own challenges.</p>
                </div>

                <div className="premium-card bg-bg-card border-none shadow-none p-8 w-full max-w-lg text-left flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <div className="font-bold text-dark text-xl leading-tight">Profile optimized</div>
                    <div className="text-text-muted font-medium">Your trust score is now 100%</div>
                  </div>
                </div>

                <button onClick={finish} className="btn-primary py-5 px-16 text-lg shadow-xl shadow-primary/20">
                  Go to Dashboard
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </main>
    </div>
  );
}
