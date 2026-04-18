"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

import { clearDemoSession } from "../../utils/auth-session";
import { protectedRoutes } from "../../utils/routes";

const publicLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explore", href: "/explore" },
  { label: "Create Request", href: "/create-request" },
  { label: "Messages", href: "/messages" },
  { label: "Profile", href: "/profile" },
];

const protectedLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explore", href: "/explore" },
  { label: "Create Request", href: "/create-request" },
  { label: "Messages", href: "/messages" },
  { label: "Profile", href: "/profile" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const links = isProtected ? protectedLinks : publicLinks;

  const handleSignOut = () => {
    clearDemoSession();
    toast.success("Signed out successfully.");
    router.push("/login");
    router.refresh();
  };
  return (
    <header className="topbar">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="brand text-unwrap">
            <span className="brand-badge">H</span>
            <span className="text-unwrap" style={{ whiteSpace: "nowrap" }}>
              HelpHub AI
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="btn btn-secondary lg:!hidden !px-4 !py-3 !shadow-sm"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden lg:flex items-center justify-end gap-8 flex-1 whitespace-nowrap">
            <nav className="nav-links flex items-center gap-1">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={isActive ? "active font-bold" : "font-medium"}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 ml-4">
              {isProtected ? (
                <>
                  <Link
                    href="/notifications"
                    className="pill hover:bg-white transition-colors"
                  >
                    Notifications
                  </Link>
                  <Link
                    href="/ai-center"
                    className="btn-primary !py-2.5 !px-6 text-sm"
                  >
                    Open AI Center
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn-secondary !py-2.5 !px-6 text-sm"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/leaderboard"
                    className="pill hover:bg-white transition-colors"
                  >
                    Leaderboard
                  </Link>
                  <Link
                    href="/login"
                    className="btn-primary !py-2.5 !px-6 text-sm"
                  >
                    Join the platform
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="mt-4 rounded-[24px] border border-white/50 bg-white/95 p-6 shadow-xl lg:hidden backdrop-filter blur-xl">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-full px-4 py-3 font-semibold ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text-muted hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              {isProtected ? (
                <>
                  <Link href="/notifications" className="pill justify-center">
                    Notifications
                  </Link>
                  <Link
                    href="/ai-center"
                    className="btn btn-primary w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Open AI Center
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-secondary w-full"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/leaderboard"
                    className="pill justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Leaderboard
                  </Link>
                  <Link
                    href="/login"
                    className="btn btn-primary w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join the platform
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
