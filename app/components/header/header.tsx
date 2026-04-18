"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { setCookie, deleteCookie } from "cookies-next";
import { protectedRoutes } from "../../utils/routes";

const getLinks = (pathname: string, isProtected: boolean) => {
  if (!isProtected) {
    return [
      { name: "Home", href: "/" },
      { name: "Explore", href: "/explore" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "AI Center", href: "/ai-center" },
    ];
  }

  if (pathname.includes("/leaderboard")) {
    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Explore", href: "/explore" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "AI Center", href: "/ai-center" },
    ];
  }

  if (pathname.includes("/notifications")) {
    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Explore", href: "/explore" },
      { name: "Notifications", href: "/notifications" },
      { name: "AI Center", href: "/ai-center" },
    ];
  }

  if (pathname.includes("/create-request")) {
    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Explore", href: "/explore" },
      { name: "Create", href: "/create-request" },
      { name: "AI Center", href: "/ai-center" },
    ];
  }

  if (pathname.includes("/explore")) {
    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Explore", href: "/explore" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "AI Center", href: "/ai-center" },
    ];
  }

  if (pathname.includes("/ai-center")) {
    return [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Explore", href: "/explore" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "AI Center", href: "/ai-center" },
    ];
  }

  return [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Explore", href: "/explore" },
    { name: "AI Center", href: "/ai-center" },
    { name: "Onboarding", href: "/onboarding" },
    { name: "Profile", href: "/profile" },
  ];
};

export default function Header() {
  const pathname = usePathname();
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const links = getLinks(pathname, isProtected);

  const handleSignOut = () => {
    deleteCookie("auth_token");
    window.location.href = "/login";
  };

  return (
    <header className="glass-header sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            H
          </div>
          <span className="font-bold text-xl tracking-tight text-dark">
            HelpHub AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                pathname === link.href
                  ? "bg-bg-card text-dark shadow-sm"
                  : "text-text-muted hover:text-dark hover:bg-black/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {!isProtected ? (
          <>
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
              <span className="notif-dot" />
              Live community signals
            </div>
            <Link href="/login" className="btn-primary text-xs px-6 py-2.5">
              Join the platform
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
              <span className="notif-dot" />
              Session active
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm font-bold text-dark hover:text-primary transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
