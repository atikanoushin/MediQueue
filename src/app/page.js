"use client";

import Link from "next/link";
import { translations } from "@/data/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const t = translations[language];
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen ${isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-sm ${
        isDark ? "bg-slate-950/90 border-slate-800" : "bg-white/90 border-slate-100"
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <span className={`h-9 w-9 rounded-full flex items-center justify-center ${
              isDark ? "bg-blue-500/20 border border-blue-400 text-blue-300" : "bg-blue-50 border border-blue-100 text-blue-600"
            }`}>
              ◉
            </span>
            MediQueue
          </Link>

          <div className={`hidden md:flex items-center gap-8 text-sm font-semibold ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}>
            <Link href="/" className="text-blue-500 border-b-2 border-blue-500 pb-1">
              {t.home}
            </Link>

            <Link href="/care-finder" className="hover:text-blue-500 transition">
              {t.quickCare}
            </Link>

            <Link href="/doctors" className="hover:text-blue-500 transition">
              {t.browseDoctors}
            </Link>

            <Link href="/doctor-dashboard" className="hover:text-blue-500 transition">
              {t.forDoctors}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`border rounded-xl px-3 py-2 text-sm font-semibold outline-none ${
                isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
              <option value="es">Español</option>
            </select>

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

            <Link
              href="/login"
              className={`border px-5 py-2 rounded-xl font-semibold transition ${
                isDark
                  ? "border-slate-700 text-slate-200 hover:border-blue-400"
                  : "border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {t.login}
            </Link>

            <Link
              href="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold shadow-sm hover:bg-blue-700 hover:scale-105 transition"
            >
              {t.signUp}
            </Link>
          </div>
        </div>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto px-6 py-14 items-center">
        <div className="animate-fade-up">
          <p className="text-blue-500 font-semibold mb-4">
            {t.heroLabel}
          </p>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {t.heroLine1}
            <br />
            {t.heroLine2}
            <br />
            <span className="text-blue-500">{t.heroLine3}</span>
          </h1>

          <p className={`text-lg mt-6 max-w-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t.heroDescription}
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/care-finder"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition"
            >
              {t.primaryCta}
            </Link>

            <Link
              href="/doctors"
              className={`border px-6 py-3 rounded-xl font-semibold hover:scale-105 transition ${
                isDark
                  ? "border-blue-400 text-blue-300 hover:bg-slate-900"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              {t.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative animate-float-soft">
          <div className={`rounded-3xl p-8 shadow-sm ${
            isDark ? "bg-slate-900 border border-slate-800" : "bg-blue-50"
          }`}>
            <div className={`rounded-3xl p-6 shadow-xl border ${
              isDark ? "bg-slate-900 border-slate-700" : "bg-white border-blue-100"
            }`}>
              <p className="text-green-500 font-semibold text-sm">
                BEST MATCH FOUND
              </p>

              <h3 className="text-2xl font-extrabold mt-3">
                Buffalo Urgent Care
              </h3>

              <p className={`mt-1 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                Recommended for: burn or minor injury care
              </p>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className={`rounded-2xl p-4 ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                  <p className="text-blue-500 text-sm font-semibold">Wait</p>
                  <p className="text-xl font-extrabold mt-1">12 min</p>
                </div>

                <div className={`rounded-2xl p-4 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                  <p className={isDark ? "text-slate-400 text-sm" : "text-slate-400 text-sm"}>
                    Distance
                  </p>
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

      <section className="max-w-6xl mx-auto px-6 pb-14 animate-fade-up">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 border rounded-2xl shadow-sm p-6 ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div>
            <p className="text-2xl font-bold text-blue-500">12 min</p>
            <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>Fastest Wait Found</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-blue-500">2h+</p>
            <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>Wait Time Saved</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-blue-500">5 sec</p>
            <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>Queue Refresh</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-blue-500">24/7</p>
            <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"}>Queue Access</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 animate-fade-up">
        <h2 className="text-3xl font-bold text-center">
          How MediQueue Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {[
            ["1. Describe Symptoms", "Tell MediQueue what you’re experiencing."],
            ["2. Compare Care Options", "See nearby clinics by wait time, distance, and specialty."],
            ["3. Book Appointment", "Reserve your spot in the live queue."],
            ["4. Leave On Time", "Get ETA guidance based on queue speed and travel time."],
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