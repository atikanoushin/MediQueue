"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConfirmationPage() {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestAppointment = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success && data.appointments.length > 0) {
      const latestAppointment = data.appointments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0];

      setAppointment(latestAppointment);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLatestAppointment();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading confirmation...</p>
      </main>
    );
  }

  if (!appointment) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center max-w-md">
          <h1 className="text-3xl font-extrabold">
            No appointment found
          </h1>

          <p className="text-slate-500 mt-4">
            Please book an appointment first.
          </p>

          <Link
            href="/appointment"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Book Appointment
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <span className="text-5xl text-green-600">✓</span>
          </div>

          <p className="text-green-600 font-semibold mt-6">
            APPOINTMENT CONFIRMED
          </p>

          <h1 className="text-4xl font-extrabold mt-3">
            You're all set!
          </h1>

          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Your appointment has been successfully booked. You can track your
            queue position and get smart leave-time guidance from your dashboard.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold">
            Appointment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-slate-400 text-sm">Patient</p>
              <p className="font-bold text-lg">
                {appointment.patientName}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Doctor / Clinic</p>
              <p className="font-bold text-lg">
                {appointment.doctorName}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Specialty</p>
              <p className="font-bold text-lg">
                {appointment.specialty}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Date</p>
              <p className="font-bold text-lg">
                {appointment.date}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Time</p>
              <p className="font-bold text-lg">
                {appointment.time}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Status</p>
              <p className="font-bold text-lg text-green-600">
                {appointment.status}
              </p>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-sm text-blue-600 font-semibold">
              QUEUE STATUS
            </p>

            <h3 className="text-3xl font-extrabold mt-2">
              #{appointment.queuePosition || 1}
            </h3>

            <p className="text-slate-600 mt-2">
              You have joined the live queue. MediQueue will estimate when you
              should leave based on queue speed and travel time.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link
              href="/patient-queue"
              className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Track Queue
            </Link>

            <Link
              href="/patient-dashboard"
              className="flex-1 border border-blue-600 text-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Go To Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}