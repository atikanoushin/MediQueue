"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const [role, setRole] = useState("patient");
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      if (role === "doctor") {
        router.push("/doctor-dashboard");
      } else {
        router.push("/patient-dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-between bg-blue-600 text-white p-12">
          <Link href="/" className="text-3xl font-extrabold">
            MediQueue
          </Link>

          <div>
            <p className="text-blue-100 font-semibold">
              Smart healthcare access
            </p>

            <h1 className="text-5xl font-extrabold leading-tight mt-4">
              Book visits.
              <br />
              Track queues.
              <br />
              Get prescriptions.
            </h1>

            <p className="text-blue-100 text-lg mt-6 max-w-md">
              A unified platform for patients and doctors to reduce clinic
              waiting time and manage appointments smoothly.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/15 rounded-2xl p-4">
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-blue-100">Queue Tracking</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-4">
              <p className="text-2xl font-bold">PDF</p>
              <p className="text-sm text-blue-100">Prescriptions</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-4">
              <p className="text-2xl font-bold">AWS</p>
              <p className="text-sm text-blue-100">DynamoDB</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-sm p-8">
            <div className="text-center">
              <Link
                href="/"
                className="inline-block text-2xl font-extrabold text-blue-700 lg:hidden"
              >
                MediQueue
              </Link>

              <h2 className="text-3xl font-extrabold mt-3">
                {mode === "login" ? "Welcome back" : "Create account"}
              </h2>

              <p className="text-slate-500 mt-2">
                {mode === "login"
                  ? "Login to continue to your dashboard"
                  : "Sign up as a patient or doctor"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Continue as</label>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setRole("patient")}
                    className={`border p-3 rounded-xl font-semibold transition ${
                      role === "patient"
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    Patient
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("doctor")}
                    className={`border p-3 rounded-xl font-semibold transition ${
                      role === "doctor"
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    Doctor
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:scale-[1.01] transition mt-2"
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </button>
            </form>

            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="mt-5 text-blue-600 font-semibold w-full text-center hover:text-blue-700"
            >
              {mode === "login"
                ? "Need an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}