"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function AddWalkInPatientPage() {
  const router = useRouter();

  const [location, setLocation] = useState("New York, USA");
  const [clinic, setClinic] = useState("CityMD Urgent Care");
  const [patientName, setPatientName] = useState("");
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false);

  const addPatient = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      router.replace("/login");
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
        userEmail: `walkin-${Date.now()}@mediqueue.demo`,
        doctorName: clinic,
        doctorEmail: auth.currentUser.email,
        specialty: symptom,
        date: new Date().toISOString().split("T")[0],
        time: "Walk-in",
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      router.push("/doctor-dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-blue-600 dark:text-blue-400 font-semibold">
          Doctor Tools
        </p>

        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
          Add Walk-in Patient
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Add an in-person patient directly to today&apos;s live queue.
        </p>

        <form
          onSubmit={addPatient}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-5 sm:p-8 mt-8 flex flex-col gap-5"
        >
          <div>
            <label className="font-semibold text-sm">Select Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
            >
              <option>New York, USA</option>
              <option>California, USA</option>
              <option>Dhaka, Bangladesh</option>
              <option>New Delhi, India</option>
              <option>Karachi, Pakistan</option>
              <option>Toronto, Canada</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Select Clinic</label>
            <select
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
            >
              <option>CityMD Urgent Care</option>
              <option>NYU Langone Primary Care</option>
              <option>Mount Sinai Primary Care</option>
              <option>Aga Khan Family Medicine</option>
              <option>Square Hospital Outpatient</option>
              <option>Toronto General Outpatient</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Symptom / Reason</label>
            <textarea
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="Example: fever, burn, wrist pain, chest discomfort"
              rows="4"
              className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Adding Patient..." : "Add Patient"}
          </button>
        </form>
      </section>
    </main>
  );
}