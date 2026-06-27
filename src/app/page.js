"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setRole(localStorage.getItem("mediqueueRole"));
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("mediqueueRole");
    await signOut(auth);
    setUser(null);
    setRole(null);
    router.push("/");
  };

  const handleDoctorPortal = () => {
    if (user && role === "doctor") {
      router.push("/doctor-dashboard");
      return;
    }

    if (user && role === "patient") {
      alert(
        "You are signed in as a patient. Please logout and sign in as a doctor to access the Doctor Portal."
      );
      return;
    }

    router.push("/login");
  };

  const dashboardHref =
    role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";

  const dashboardLabel =
    role === "doctor" ? "Doctor Dashboard" : "Patient Dashboard";

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <nav
        className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-sm ${
          isDark
            ? "bg-slate-950/90 border-slate-800"
            : "bg-white/90 border-slate-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight"
          >
            <span
              className={`h-9 w-9 rounded-full flex items-center justify-center ${
                isDark
                  ? "bg-blue-500/20 border border-blue-400 text-blue-300"
                  : "bg-blue-50 border border-blue-100 text-blue-600"
              }`}
            >
              ◉
            </span>
            MediQueue
          </Link>

          <div
            className={`hidden lg:flex items-center gap-7 text-sm font-semibold ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            <Link href="/" className="text-blue-500 border-b-2 border-blue-500 pb-1">
              Home
            </Link>

            <Link href="/care-finder" className="hover:text-blue-500 transition">
              QuickCare Locator
            </Link>

            <Link href="/doctors" className="hover:text-blue-500 transition">
              Browse Doctors
            </Link>

            <button onClick={handleDoctorPortal} className="hover:text-blue-500 transition">
              For Doctors
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`border px-4 py-2 rounded-xl font-semibold text-sm transition ${
                isDark
                  ? "border-slate-700 text-slate-200 hover:border-blue-400"
                  : "border-slate-200 text-slate-700 hover:border-blue-300"
              }`}
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className={`border px-5 py-2 rounded-xl font-semibold transition ${
                    isDark
                      ? "border-slate-700 text-slate-200 hover:border-blue-400"
                      : "border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {dashboardLabel}
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`border px-5 py-2 rounded-xl font-semibold transition ${
                    isDark
                      ? "border-slate-700 text-slate-200 hover:border-blue-400"
                      : "border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:bg-blue-700 hover:scale-105 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden border px-4 py-2 rounded-xl font-semibold ${
              isDark
                ? "border-slate-700 text-white"
                : "border-slate-200 text-slate-700"
            }`}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className={`lg:hidden px-4 sm:px-6 pb-5 flex flex-col gap-3 ${
              isDark ? "bg-slate-950" : "bg-white"
            }`}
          >
            <Link href="/" className="font-semibold text-blue-500">
              Home
            </Link>

            <Link href="/care-finder" className="font-semibold">
              QuickCare Locator
            </Link>

            <Link href="/doctors" className="font-semibold">
              Browse Doctors
            </Link>

            <button onClick={handleDoctorPortal} className="text-left font-semibold">
              For Doctors
            </button>

            <button
              onClick={toggleTheme}
              className={`border px-4 py-2 rounded-xl font-semibold text-sm ${
                isDark
                  ? "border-slate-700 text-slate-200"
                  : "border-slate-200 text-slate-700"
              }`}
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="border border-blue-600 text-blue-600 text-center px-5 py-2 rounded-xl font-semibold"
                >
                  {dashboardLabel}
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`border text-center px-5 py-2 rounded-xl font-semibold ${
                    isDark
                      ? "border-slate-700 text-slate-200"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/login"
                  className="bg-blue-600 text-white text-center px-5 py-2 rounded-xl font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 items-center">
        <div className="animate-fade-up">
          <p className="text-blue-500 font-semibold mb-4">
            Smart healthcare navigation platform
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Find the fastest care.
            <br />
            Avoid long waits.
            <br />
            <span className="text-blue-500">Arrive on time.</span>
          </h1>

          <p
            className={`text-lg mt-6 max-w-xl ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            MediQueue helps patients describe symptoms, find the fastest
            appropriate clinic nearby, book appointments, and know exactly when
            to leave based on live queue movement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/care-finder"
              className="bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition"
            >
              Find Fastest Care
            </Link>

            <Link
              href="/doctors"
              className={`border text-center px-6 py-3 rounded-xl font-semibold hover:scale-105 transition ${
                isDark
                  ? "border-blue-400 text-blue-300 hover:bg-slate-900"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Browse Doctors
            </Link>
          </div>
        </div>

        <div className="relative animate-float-soft">
          <div
            className={`rounded-3xl p-5 sm:p-8 shadow-sm ${
              isDark ? "bg-slate-900 border border-slate-800" : "bg-blue-50"
            }`}
          >
            <div
              className={`rounded-3xl p-5 sm:p-6 shadow-xl border ${
                isDark
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-blue-100"
              }`}
            >
              <p className="text-green-500 font-semibold text-sm">
                BEST MATCH FOUND
              </p>

              <h3 className="text-2xl font-extrabold mt-3">
                Buffalo Urgent Care
              </h3>

              <p className={`mt-1 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                Recommended for: burn or minor injury care
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className={`rounded-2xl p-4 ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                  <p className="text-blue-500 text-sm font-semibold">Wait</p>
                  <p className="text-xl font-extrabold mt-1">12 min</p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                  <p className="text-slate-400 text-sm">Estimated Distance</p>
                  <p className="text-xl font-extrabold mt-1">2.4 mi</p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                  <p className="text-slate-400 text-sm">Leave In</p>
                  <p className="text-xl font-extrabold mt-1">6 min</p>
                </div>
              </div>

              <div className={`rounded-2xl p-5 mt-6 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                <p className="font-bold">Why this option?</p>
                <p className={`mt-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Shortest appropriate wait time nearby compared to larger clinics with longer queues.
                </p>
              </div>

              <Link
                href="/care-finder"
                className="block bg-blue-600 text-white text-center mt-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Try QuickCare Locator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 animate-fade-up">
        <div
          className={`rounded-3xl border shadow-sm p-6 sm:p-10 ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}
        >
          <p className="text-blue-600 font-semibold">
            Every recommendation follows a transparent, safety-first workflow.
          </p>

          <h2
            className={`text-3xl sm:text-4xl font-extrabold mt-3 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            From symptoms to the fastest safe care option.
          </h2>

          <p className={`mt-4 max-w-3xl ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            MediQueue follows a transparent decision flow: it checks symptoms,
            detects emergencies, matches the right specialty, compares total
            time to treatment, and recommends the fastest appropriate care.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              ["🩺", "Symptoms", "Patient describes what they feel."],
              ["🚨", "Emergency Check", "Dangerous symptoms are escalated immediately."],
              ["🏥", "Match Specialty", "MediQueue finds the right care category."],
              ["⏱️", "Compare Time", "Travel, queue, and delay are combined."],
              ["✅", "Recommend", "The fastest safe option is shown first."],
            ].map(([icon, title, text], index) => (
              <div key={title} className="relative">
                <div
                  className={`h-full rounded-2xl border p-5 ${
                    isDark
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <div className="text-3xl">{icon}</div>
                  <h3 className={`font-bold mt-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                    {title}
                  </h3>
                  <p className={`text-sm mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {text}
                  </p>
                </div>

                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-blue-500 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 animate-fade-up">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 border rounded-2xl shadow-sm p-6 ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}
        >
          {[
            ["12 min", "Fastest Wait Found"],
            ["2h+", "Wait Time Saved"],
            ["5 sec", "Queue Refresh"],
            ["24/7", "Queue Access"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold text-blue-500">{value}</p>
              <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 animate-fade-up">
        <h2 className="text-3xl font-bold text-center">How MediQueue Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {[
            ["1. Describe Symptoms", "Tell MediQueue what you’re experiencing."],
            ["2. Compare Care Options", "See nearby clinics by wait time, distance, and specialty."],
            ["3. Book Appointment", "Reserve your spot in the live queue."],
            ["4. Leave On Time", "Get ETA guidance based on queue speed and estimated travel time."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className={`border rounded-2xl p-6 shadow-sm hover:-translate-y-2 hover:shadow-md transition duration-300 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
              }`}
            >
              <p className="text-blue-500 font-bold">{title}</p>
              <p className={`mt-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}