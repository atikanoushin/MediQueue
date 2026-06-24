"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";

function AppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDoctor = searchParams.get("doctor") || "Dr. Sarah Ahmed";
  const selectedSpecialty = searchParams.get("specialty") || "Cardiologist";
  const from = searchParams.get("from") || "patient";

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState(selectedDoctor);
  const [specialty, setSpecialty] = useState(selectedSpecialty);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("5:00 PM");
  const [loading, setLoading] = useState(false);

  const bookAppointment = async (event) => {
    event.preventDefault();
    if (!auth.currentUser) {
  router.push("/login");
  return;
}
    setLoading(true);

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientName,
        doctorName,
        specialty,
        date,
        time,
        queuePosition: 1,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      router.push(`/confirmation?from=${from}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-blue-600 font-semibold">Book your visit</p>
          <h1 className="text-4xl font-extrabold tracking-tight mt-2">
            Schedule an Appointment
          </h1>
          <p className="text-slate-600 mt-3">
            Confirm the recommended clinic, choose a time slot, and join the live queue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form
            onSubmit={bookAppointment}
            className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-sm p-8 flex flex-col gap-5"
          >
            <div className="bg-blue-50 dark:bg-blue-500/15 border border-blue-100 dark:border-blue-400/30 rounded-2xl p-5">
              <p className="text-blue-600 text-sm font-semibold">
                SELECTED CARE OPTION
              </p>
              <h2 className="text-2xl font-extrabold mt-2 text-slate-900 dark:text-white">{doctorName}</h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">{specialty}</p>
            </div>

            <div>
              <label className="font-semibold text-sm">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Doctor / Clinic</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Specialty</label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Date</label>
              <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  min="2026-01-01"
  max="2030-12-31"
  className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
  required
/>
            </div>

            <div>
              <label className="font-semibold text-sm">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-2 w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
              >
                <option>5:00 PM</option>
                <option>5:30 PM</option>
                <option>6:00 PM</option>
                <option>6:30 PM</option>
                <option>7:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:scale-[1.01] transition disabled:opacity-60"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>

          <aside className="bg-blue-600 text-white rounded-3xl shadow-sm p-8 h-fit">
            <p className="text-blue-100 font-semibold">Smart Queue Benefit</p>
            <h2 className="text-2xl font-bold mt-3">Book now. Leave later.</h2>
            <p className="text-blue-100 mt-4">
              After booking, MediQueue tracks queue movement and predicts when
              you should leave based on estimated wait and travel time.
            </p>

            <div className="bg-white/15 rounded-2xl p-5 mt-6">
              <p className="text-sm text-blue-100">Estimated Queue Wait</p>
              <p className="text-3xl font-bold mt-2">15 min</p>
              <p className="text-sm text-blue-100 mt-1">
                Updates every few seconds
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5 mt-4">
              <p className="text-sm text-blue-100">Leave-Time Prediction</p>
              <p className="text-3xl font-bold mt-2">Smart ETA</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-slate-500">Loading appointment...</p>
        </main>
      }
    >
      <AppointmentContent />
    </Suspense>
  );
}