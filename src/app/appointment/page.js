"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";

function AppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDoctor = searchParams.get("doctor") || "Dr. Sarah Ahmed";
  const selectedSpecialty = searchParams.get("specialty") || "Cardiologist";
  const selectedTime = searchParams.get("time") || "5:00 PM";
  const from = searchParams.get("from") || "patient";

  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(selectedTime);
  const [loading, setLoading] = useState(false);

  const bookAppointment = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
  sessionStorage.setItem(
    "pendingAppointment",
    JSON.stringify({
      patientName,
      doctor: selectedDoctor,
      specialty: selectedSpecialty,
      date,
      time,
      from,
    })
  );

  router.replace("/login?redirect=appointment");
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
        userEmail: auth.currentUser.email,
        doctorName: selectedDoctor,
        doctorEmail:
  from === "doctor"
    ? auth.currentUser.email
    : "demo.doctor@mediqueue.com",
        specialty: selectedSpecialty,
        date,
        time,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
  sessionStorage.removeItem("pendingAppointment");
  router.push(`/confirmation?from=${from}`);
} else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Book your visit
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Schedule an Appointment
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl">
            Confirm the selected clinic, choose a date and time, and join the
            live queue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <form
            onSubmit={bookAppointment}
            className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-5 sm:p-8 flex flex-col gap-5"
          >
            <div className="bg-blue-50 dark:bg-blue-500/15 border border-blue-100 dark:border-blue-400/30 rounded-2xl p-5">
              <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
                SELECTED CARE OPTION
              </p>

              <h2 className="text-xl sm:text-2xl font-extrabold mt-2 text-slate-900 dark:text-white break-words">
                {selectedDoctor}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 mt-1">
                {selectedSpecialty}
              </p>
            </div>

            <div>
              <label className="font-semibold text-sm">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                max="2030-12-31"
                className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
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

          <aside className="bg-blue-600 text-white rounded-3xl shadow-sm p-5 sm:p-8 h-fit">
            <p className="text-blue-100 font-semibold">Smart Queue Benefit</p>

            <h2 className="text-xl sm:text-2xl font-bold mt-3">
              Book now. Leave later.
            </h2>

            <p className="text-blue-100 mt-4">
              After booking, MediQueue tracks queue movement and predicts when
              you should leave based on estimated wait and travel time.
            </p>

            <div className="bg-white/15 rounded-2xl p-5 mt-6">
              <p className="text-sm text-blue-100">Estimated Queue Wait</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">15 min</p>
              <p className="text-sm text-blue-100 mt-1">
                Updates every few seconds
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5 mt-4">
              <p className="text-sm text-blue-100">Leave-Time Prediction</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">Smart ETA</p>
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
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">
            Loading appointment...
          </p>
        </main>
      }
    >
      <AppointmentContent />
    </Suspense>
  );
}