"use client";

import { useState } from "react";
import Link from "next/link";

export default function DoctorProfilePage() {
  const [selectedTime, setSelectedTime] = useState("5:00 PM");

  const doctorName = "Dr. Sarah Ahmed";
  const specialty = "Cardiologist";

  const slots = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="h-36 w-36 rounded-full bg-blue-50 border border-blue-100" />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-extrabold">
                  {doctorName}
                </h1>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Available Today
                </span>
              </div>

              <p className="text-slate-500 mt-2 text-lg">
                {specialty}
              </p>

              <div className="flex flex-wrap gap-6 mt-5 text-sm">
                <div>
                  <p className="text-slate-400">Experience</p>
                  <p className="font-bold">12 Years</p>
                </div>

                <div>
                  <p className="text-slate-400">Rating</p>
                  <p className="font-bold text-yellow-500">
                    ★ 4.9
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Patients</p>
                  <p className="font-bold">5,000+</p>
                </div>

                <div>
                  <p className="text-slate-400">Consultation Fee</p>
                  <p className="font-bold">$25</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-8">
          <h2 className="text-2xl font-bold">
            About Doctor
          </h2>

          <p className="text-slate-600 mt-4 leading-relaxed">
            Dr. Sarah Ahmed is an experienced cardiologist specializing
            in preventive cardiac care, heart disease management,
            and patient-centered treatment planning.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mt-8">
          <h2 className="text-2xl font-bold">
            Available Appointment Slots
          </h2>

          <p className="text-slate-500 mt-2">
            Select a time slot before booking your appointment.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`px-5 py-3 rounded-xl border font-semibold transition ${
                  selectedTime === slot
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-700 border-blue-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mt-6">
            <p className="text-blue-600 text-sm font-semibold">
              SELECTED SLOT
            </p>

            <p className="text-2xl font-extrabold mt-1">
              {selectedTime}
            </p>
          </div>

          <Link
            href={`/appointment?doctor=${encodeURIComponent(
              doctorName
            )}&specialty=${encodeURIComponent(
              specialty
            )}&time=${encodeURIComponent(selectedTime)}`}
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}