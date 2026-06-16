import Link from "next/link";
import { appointments } from "@/data/appointments";

export default function PatientDashboardPage() {
  const appointment = appointments[0];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">

        <div>
          <p className="text-blue-600 font-semibold">
            Patient Portal
          </p>

          <h1 className="text-4xl font-extrabold mt-2">
            Welcome back, {appointment.patientName}
          </h1>

          <p className="text-slate-500 mt-2">
            Manage appointments, prescriptions, and queue status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">

            <p className="text-sm font-semibold text-blue-600">
              UPCOMING APPOINTMENT
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {appointment.doctorName}
            </h2>

            <p className="text-slate-500 mt-2">
              {appointment.time}
            </p>

            <div className="flex gap-3 mt-6">

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

            </div>

          </div>

          <div className="bg-blue-600 text-white rounded-3xl shadow-sm p-8">

            <p className="text-blue-100 font-semibold">
              LIVE QUEUE
            </p>

            <h2 className="text-5xl font-extrabold mt-4">
              #{appointment.queuePosition}
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

            <h3 className="font-bold text-lg">
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

            <h3 className="font-bold text-lg">
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

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:-translate-y-1 transition">

            <h3 className="font-bold text-lg">
              Download Prescription
            </h3>

            <p className="text-slate-500 mt-2">
              Access your latest prescription PDF.
            </p>

            <Link
              href="/prescription-history"
              className="inline-block mt-4 text-blue-600 font-semibold"
            >
              Download →
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}