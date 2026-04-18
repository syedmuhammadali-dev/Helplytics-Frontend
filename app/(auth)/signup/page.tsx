"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { setCookie } from "cookies-next";
import Header from "../../components/header/header";

const AUTH_TOKEN_KEY = "auth_token";
const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 7,
};

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Both");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    // Mock signup
    setTimeout(() => {
      setCookie(AUTH_TOKEN_KEY, "mock_token_123", COOKIE_OPTIONS);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-0 w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10"
        >
          {/* Left Panel */}
          <div className="bg-dark p-12 lg:p-16 flex flex-col justify-center gap-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <img src="/assets/auth-banner.png" alt="Auth background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-80px] right-[-80px] w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />

            <div className="relative z-10">
              <span className="section-label text-primary">
                Join the Network
              </span>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Become part of
                <br />
                something real.
              </h1>
              <p className="text-white/60 leading-relaxed mb-8">
                Create your community identity, choose your role, and start
                making meaningful connections with students, mentors, and
                builders across the platform.
              </p>

              <ul className="flex flex-col gap-4 text-sm text-white/80">
                {[
                  "Choose to give help, get help, or do both",
                  "Build your trust score and earn community badges",
                  "Get AI-powered matches for your requests",
                  "Track your contribution impact over time",
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
          <div className="bg-bg-card p-12 lg:p-16 flex flex-col gap-6">
            <div>
              <span className="section-label text-primary">Create Account</span>
              <h2 className="text-4xl font-bold text-dark mb-2 leading-tight">
                Set up your
                <br />
                community profile
              </h2>
            </div>

            <form onSubmit={handleSignup} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="form-input pr-12"
                    required
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

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">
                  Role
                </label>
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
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-tag-red-text text-sm font-medium bg-tag-red-bg py-2.5 px-4 rounded-xl"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-text-muted text-sm text-center mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
