"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function PatientDashboardPage() {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const router = useRouter();

  const fetchLatestAppointment = async (userEmail) => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success && data.appointments.length > 0) {
      const userAppointments = data.appointments.filter(
        (app) => app.userEmail === userEmail
      );

      if (userAppointments.length === 0) {
        setAppointment(null);
        setLoading(false);
        return;
      }

      const sortedAppointments = [...userAppointments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAppointment(sortedAppointments[0]);
    } else {
      setAppointment(null);
    }

    setLoading(false);
  };

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const role = localStorage.getItem("mediqueueRole");

    if (!user || role !== "patient") {
      router.replace("/login");
      return;
    }

    fetchLatestAppointment(user.email);
  });

  return () => unsubscribe();
}, [router]);

  const handleLogout = async () => {
  localStorage.removeItem("mediqueueRole");

  await signOut(auth);

  router.push("/");
};

  const cancelAppointment = async () => {
    if (!appointment) return;

    const confirmCancel = confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    setCanceling(true);

    const response = await fetch(
      `/api/appointments?id=${appointment.id}&userEmail=${auth.currentUser.email}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      setAppointment(null);
    } else {
      alert(data.error);
    }

    setCanceling(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">
          Loading patient dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              Patient Portal
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 force-light-title">
              Welcome back
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              Manage appointments, prescriptions, and queue status.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto border border-slate-300 text-slate-700 dark:text-white dark:border-slate-700 px-5 py-2 rounded-xl font-semibold hover:border-red-400 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>

        {!appointment && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-8 mt-10">
            <h2 className="text-2xl font-bold">
              No active appointment
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-3">
              You currently do not have an upcoming appointment.
            </p>

            <Link
              href="/care-finder"
              className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Find Care
            </Link>
          </div>
        )}

        {appointment && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-8">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  UPCOMING APPOINTMENT
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-3 force-light-title break-words">
                  {appointment.doctorName}
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  {appointment.specialty} • {appointment.time}
                </p>

                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Patient: {appointment.patientName}
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-6">
                  <Link
                    href="/patient-queue"
                    className="bg-blue-600 text-white text-center px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Track Queue
                  </Link>

                  <Link
                    href="/care-finder"
                    className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 text-center px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                  >
                    Book Another
                  </Link>

                  <button
                    onClick={cancelAppointment}
                    disabled={canceling}
                    className="border border-red-500 text-red-600 text-center px-5 py-3 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 transition disabled:opacity-60"
                  >
                    {canceling ? "Canceling..." : "Cancel Appointment"}
                  </button>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-3xl shadow-sm p-5 sm:p-8">
                <p className="text-blue-100 font-semibold">
                  LIVE QUEUE
                </p>

                <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">
                  #{appointment.queuePosition || 1}
                </h2>

                <p className="mt-3 text-blue-100">
                  Current Queue Position
                </p>

                <p className="mt-6 text-sm text-blue-100">
                  Estimated waiting time:
                </p>

                <p className="text-2xl font-bold">
                  15 Minutes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6 hover:-translate-y-1 transition">
    <h3 className="font-bold text-lg force-light-title">
      Smart Leave-Time Guide
    </h3>

    <p className="text-slate-500 dark:text-slate-400 mt-2">
      Know when to leave based on queue speed, travel time, and safety buffer.
    </p>

    <Link
      href="/patient-queue"
      className="inline-block mt-4 text-blue-600 dark:text-blue-400 font-semibold"
    >
      Track Queue →
    </Link>
  </div>

  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 sm:p-6 hover:-translate-y-1 transition">
    <h3 className="font-bold text-lg force-light-title">
      Find Faster Care
    </h3>

    <p className="text-slate-500 dark:text-slate-400 mt-2">
      Search symptoms again and compare faster nearby care options.
    </p>

    <Link
      href="/care-finder"
      className="inline-block mt-4 text-blue-600 dark:text-blue-400 font-semibold"
    >
      Open Care Finder →
    </Link>
  </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}