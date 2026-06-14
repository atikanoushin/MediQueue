"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-center">
          Welcome to MediQueue
        </h1>

        <p className="text-center text-gray-600 mt-2">
          {mode === "login"
            ? "Login to continue"
            : "Create your account"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={`border p-3 rounded-lg ${
                role === "patient" ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              Patient
            </button>

            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={`border p-3 rounded-lg ${
                role === "doctor" ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              Doctor
            </button>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg mt-2"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-5 text-blue-600 w-full text-center"
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
}