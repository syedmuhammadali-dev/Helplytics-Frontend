"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { setCookie } from "cookies-next";
import Header from "../../components/header/header";

const AUTH_TOKEN_KEY = "auth_token";
const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 7,
};

export default function LoginPage() {
  const [email, setEmail] = useState("community@helphub.ai");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Both");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login
    setTimeout(() => {
      setCookie(AUTH_TOKEN_KEY, "mock_token_123", COOKIE_OPTIONS);
      router.push("/profile");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-0 w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10"
        >
          
          {/* Left Panel */}
          <div className="bg-dark p-12 lg:p-16 flex flex-col justify-center gap-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <img src="/assets/auth-banner.png" alt="Auth background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <span className="section-label text-primary">Community Access</span>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Enter the support<br />network.
              </h1>
              <p className="text-white/60 leading-relaxed mb-8">
                Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, 
                offering, and tracking help with a premium interface.
              </p>

              <ul className="flex flex-col gap-4 text-sm text-white/80">
                {[
                  "Role-based entry for Need Help, Can Help, or Both",
                  "Direct path into dashboard, requests, AI Center, and community feed",
                  "Persistent demo session powered by community trust"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-bg-card p-12 lg:p-16 flex flex-col gap-8">
            <div>
              <span className="section-label text-primary">Login / Signup</span>
              <h2 className="text-4xl font-bold text-dark mb-4 leading-tight">
                Authenticate your<br />community profile
              </h2>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Select demo user</label>
                <div className="relative">
                  <select className="form-select">
                    <option>Ayesha Khan</option>
                    <option>Sara Noor</option>
                    <option>Hassan Ali</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Role selection</label>
                <div className="relative">
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select"
                  >
                    <option>Both</option>
                    <option>Need Help</option>
                    <option>Can Help</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input pr-12"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-dark transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-base mt-4">
                {isLoading ? "Authenticating..." : "Continue to dashboard"}
              </button>
            </form>

            <p className="text-text-muted text-sm text-center">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
