"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success) {
      setAppointments(data.appointments);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <p className="text-blue-600 font-semibold">Doctor Portal</p>

          <h1 className="text-4xl font-extrabold mt-2">
            Welcome back, Doctor
          </h1>

          <p className="text-slate-500 mt-2">
            Manage appointments, live queue, and prescriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm font-semibold text-slate-500">
              TODAY'S APPOINTMENTS
            </p>

            <h2 className="text-5xl font-extrabold text-blue-600 mt-4">
              {loading ? "..." : appointments.length}
            </h2>

            <p className="text-slate-500 mt-2">Patients scheduled</p>
          </div>

          <div className="bg-blue-600 text-white rounded-3xl shadow-sm p-6">
            <p className="text-sm font-semibold text-blue-100">
              LIVE QUEUE
            </p>

            <h2 className="text-5xl font-extrabold mt-4">
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

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm font-semibold text-slate-500">
              PRESCRIPTIONS
            </p>

            <h2 className="text-2xl font-bold mt-4">
              Create Digital Prescription
            </h2>

            <p className="text-slate-500 mt-2">
              Generate downloadable PDF prescriptions.
            </p>

            <Link
              href="/prescription"
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold"
            >
              Create Prescription
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mt-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Today's Appointment List
              </h2>

              <p className="text-slate-500 mt-1">
                Real appointment data from AWS DynamoDB.
              </p>
            </div>

            <Link
              href="/appointment"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Add Appointment
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading && <p>Loading appointments...</p>}

            {!loading && appointments.length === 0 && (
              <p className="text-slate-500">No appointments booked yet.</p>
            )}

            {!loading &&
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {appointment.patientName}
                    </h3>

                    <p className="text-slate-500">
                      {appointment.doctorName} • {appointment.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {appointment.status}
                    </span>

                    <Link
                      href="/doctor-queue"
                      className="text-blue-600 font-semibold"
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