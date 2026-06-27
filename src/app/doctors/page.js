"use client";

import { useState } from "react";
import Link from "next/link";
import { doctors } from "@/data/doctors";
import Navbar from "@/components/Navbar";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Trusted doctors near you
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Find Doctors
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl">
            Browse available doctors, compare specialties, and book your
            appointment.
          </p>

          <Link
            href="/care-finder"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Try QuickCare Locator →
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name or specialty..."
            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <p className="text-slate-500 dark:text-slate-400 mb-6">
          {filteredDoctors.length} doctor(s) found
        </p>

        {filteredDoctors.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold">
              No doctors found
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-3">
              Try another specialty or use QuickCare Locator to find the fastest
              care option.
            </p>

            <Link
              href="/care-finder"
              className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Open QuickCare Locator
            </Link>
          </div>
        )}

        {filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-500/15 border border-blue-100 dark:border-blue-400/30 mx-auto" />

                <h2 className="text-xl font-bold text-center mt-4">
                  {doctor.name}
                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-center">
                  {doctor.specialty}
                </p>

                <p className="text-yellow-500 text-center mt-2">
                  ★ 4.8
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Experience:
                    </span>{" "}
                    {doctor.experience}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Consultation Fee:
                    </span>{" "}
                    ৳{doctor.fee}
                  </p>

                  <p>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Availability:
                    </span>{" "}
                    Today
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link
                    href={`/doctor-profile?doctor=${
                      encodeURIComponent(doctor.name)}&specialty=${
                        encodeURIComponent(doctor.specialty)}&experience=${encodeURIComponent(
                          doctor.experience)}&fee=${encodeURIComponent(doctor.fee)}`}
                    className="flex-1 border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 text-center py-2 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                  >
                    View Profile
                  </Link>

                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(
                      doctor.name
                    )}&specialty=${encodeURIComponent(doctor.specialty)}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}