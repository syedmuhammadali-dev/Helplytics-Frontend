"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const links = isProtected ? protectedLinks : publicLinks;

  const handleSignOut = () => {
    clearDemoSession();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="topbar">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="brand-badge">H</span>
          <span>HelpHub AI</span>
        </Link>

        <nav className="nav-links">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          {isProtected ? (
            <>
              <Link href="/notifications" className="pill">
                Notifications
              </Link>
              <Link href="/ai-center" className="btn btn-primary">
                Open AI Center
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-secondary"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/leaderboard" className="pill">
                Leaderboard
              </Link>
              <Link href="/login" className="btn btn-primary">
                Join the platform
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
