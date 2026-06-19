"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AppointmentHistoryPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success) {
      const sortedAppointments = [...data.appointments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAppointments(sortedAppointments);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Patient Records
          </p>

          <h1 className="text-4xl font-extrabold mt-2">
            Appointment History
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            View previous and current appointments stored in DynamoDB.
          </p>
        </div>

        <div className="mt-8">
          {loading && (
            <p className="text-slate-500 dark:text-slate-400">
              Loading appointments...
            </p>
          )}

          {!loading && appointments.length === 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold">No appointments found</h2>

              <p className="text-slate-500 dark:text-slate-400 mt-3">
                You have not booked any appointments yet.
              </p>

              <Link
                href="/care-finder"
                className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Find Care
              </Link>
            </div>
          )}

          {!loading && appointments.length > 0 && (
            <div className="grid grid-cols-1 gap-5">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {appointment.doctorName}
                      </h2>

                      <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {appointment.specialty} • {appointment.date} •{" "}
                        {appointment.time}
                      </p>

                      <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Patient: {appointment.patientName}
                      </p>
                    </div>

                    <span className="bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                      {appointment.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <Link
                      href="/patient-queue"
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Track Queue
                    </Link>

                    <Link
                      href="/appointment"
                      className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 px-5 py-2 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                    >
                      Book Again
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}