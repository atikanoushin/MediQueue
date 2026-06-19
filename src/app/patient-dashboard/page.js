"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PatientDashboardPage() {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  const fetchLatestAppointment = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success && data.appointments.length > 0) {
      const sortedAppointments = [...data.appointments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAppointment(sortedAppointments[0]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLatestAppointment();
  }, []);

  const cancelAppointment = async () => {
    if (!appointment) return;

    const confirmCancel = confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    setCanceling(true);

    const response = await fetch(`/api/appointments?id=${appointment.id}`, {
      method: "DELETE",
    });

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
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading patient dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <p className="text-blue-600 font-semibold">
            Patient Portal
          </p>
          <h1 className="text-4xl font-extrabold mt-2 force-light-title">
  Welcome back
</h1>

          <p className="text-slate-500 mt-2">
            Manage appointments, prescriptions, and queue status.
          </p>
        </div>

        {!appointment && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mt-10">
            <h2 className="text-2xl font-bold">
              No active appointment
            </h2>

            <p className="text-slate-500 mt-3">
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
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <p className="text-sm font-semibold text-blue-600">
                  UPCOMING APPOINTMENT
                </p>
                <h2 className="text-3xl font-bold mt-3 force-light-title">
  {appointment.doctorName}
</h2>
                <p className="text-slate-500 mt-2">
                  {appointment.specialty} • {appointment.time}
                </p>

                <p className="text-slate-500 mt-1">
                  Patient: {appointment.patientName}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <Link
                    href="/patient-queue"
                    className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Track Queue
                  </Link>

                  <Link
                    href="/appointment"
                    className="border border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                  >
                    Book Another
                  </Link>

                  <button
                    onClick={cancelAppointment}
                    disabled={canceling}
                    className="border border-red-500 text-red-600 px-5 py-3 rounded-xl font-semibold hover:bg-red-50 transition disabled:opacity-60"
                  >
                    {canceling ? "Canceling..." : "Cancel Appointment"}
                  </button>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-3xl shadow-sm p-8">
                <p className="text-blue-100 font-semibold">
                  LIVE QUEUE
                </p>

                <h2 className="text-5xl font-extrabold mt-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:-translate-y-1 transition">
                <h3 className="font-bold text-lg force-light-title">
  Prescription History
</h3>

                <p className="text-slate-500 mt-2">
                  View all previous prescriptions.
                </p>

                <Link
                  href="/prescription-history"
                  className="inline-block mt-4 text-blue-600 font-semibold"
                >
                  Open →
                </Link>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:-translate-y-1 transition">
                <h3 className="font-bold text-lg force-light-title">
  Appointment History
</h3>

                <p className="text-slate-500 mt-2">
                  Review previous doctor visits.
                </p>

                <Link
                  href="/appointment-history"
                  className="inline-block mt-4 text-blue-600 font-semibold"
                >
                  Open →
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}