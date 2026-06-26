"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const router = useRouter();

  const fetchAppointments = async () => {
    const response = await fetch(
      "/api/appointments?doctorEmail=" + auth.currentUser.email
    );
    const data = await response.json();

    if (data.success) {
      const sortedAppointments = [...data.appointments].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setAppointments(sortedAppointments);
    }

    setLoading(false);
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const role = localStorage.getItem("mediqueueRole");

    if (!user || role !== "doctor") {
      router.replace("/login");
      return;
    }

    fetchAppointments();
  });

  return () => unsubscribe();
}, [router]);

  const clearQueue = async () => {
    const confirmClear = confirm(
      "Are you sure you want to clear all demo appointments?"
    );

    if (!confirmClear) return;

    setClearing(true);

    for (const appointment of appointments) {
      await fetch(
        `/api/appointments?id=${appointment.id}&userEmail=${appointment.userEmail}`,
        {
          method: "DELETE",
        }
      );
    }

    setAppointments([]);
    setClearing(false);
  };

  const handleLogout = async () => {
  localStorage.removeItem("mediqueueRole");

  await signOut(auth);

  router.push("/");
};

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              Doctor Portal
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
              Welcome back, Doctor
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              Manage appointments, live queue, and prescriptions.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto border border-slate-300 text-slate-700 dark:text-white dark:border-slate-700 px-5 py-2 rounded-xl font-semibold hover:border-red-400 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              TODAY&apos;S APPOINTMENTS
            </p>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mt-4">
              {loading ? "..." : appointments.length}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Patients scheduled
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-3xl shadow-sm p-5 sm:p-6">
            <p className="text-sm font-semibold text-blue-100">
              LIVE QUEUE
            </p>

            <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">
              {loading ? "..." : appointments.length}
            </h2>

            <p className="text-blue-100 mt-2">Patients waiting</p>

            <Link
              href="/doctor-queue"
              className="inline-block mt-5 bg-white text-blue-600 px-5 py-2 rounded-xl font-semibold"
            >
              Open Queue
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              DEMO CONTROLS
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mt-4">
              Reset Appointment Queue
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Clear demo appointments before recording or presenting.
            </p>

            <button
              onClick={clearQueue}
              disabled={clearing || appointments.length === 0}
              className="w-full sm:w-auto inline-block mt-5 bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
              {clearing ? "Clearing..." : "Clear Demo Queue"}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-8 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Today&apos;s Appointment List
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Today&apos;s confirmed appointments.
              </p>
            </div>

            <Link
              href="/appointment?from=doctor"
              className="w-full sm:w-auto bg-blue-600 text-white text-center px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Add Appointment
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading && (
              <p className="text-slate-500 dark:text-slate-400">
                Loading appointments...
              </p>
            )}

            {!loading && appointments.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400">
                No appointments booked yet.
              </p>
            )}

            {!loading &&
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-bold text-lg break-words">
                      {appointment.patientName}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400">
                      {appointment.doctorName} • {appointment.time}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold text-center">
                      {appointment.status}
                    </span>

                    <Link
                      href="/doctor-queue"
                      className="text-blue-600 dark:text-blue-400 font-semibold text-center"
                    >
                      View Queue →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}