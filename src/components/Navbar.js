"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    pathname === href
      ? "text-blue-600"
      : "text-slate-600 hover:text-blue-600";

  return (
    <nav className="w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link href="/" className="font-extrabold text-xl text-blue-600">
          MediQueue
        </Link>

        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/care-finder" className={linkClass("/care-finder")}>
            Care Finder
          </Link>

          <Link href="/doctors" className={linkClass("/doctors")}>
            Doctors
          </Link>

          <Link href="/patient-dashboard" className={linkClass("/patient-dashboard")}>
            Dashboard
          </Link>

          <Link href="/login" className={linkClass("/login")}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}