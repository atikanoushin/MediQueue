"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const clinicOptions = {
  "New York, USA": [
    "CityMD Urgent Care",
    "NYU Langone Primary Care",
    "Mount Sinai Primary Care",
  ],
  "California, USA": [
    "UCLA Primary Care",
    "Stanford Primary Care",
    "Cedars-Sinai Primary Care",
  ],
  "Dhaka, Bangladesh": [
    "Popular Diagnostic Center",
    "Ibn Sina Medical Center",
    "Square Hospital Outpatient",
  ],
  "New Delhi, India": [
    "Apollo Primary Care",
    "Max Healthcare OPD",
    "AIIMS OPD",
  ],
  "Karachi, Pakistan": [
    "Aga Khan Family Medicine",
    "Liaquat National OPD",
    "South City Hospital OPD",
  ],
  "Toronto, Canada": [
    "North York General Primary Care",
    "Toronto General Outpatient",
    "Sunnybrook Family Medicine",
  ],
};

export default function AddWalkInPatientPage() {
  const router = useRouter();

  const [location, setLocation] = useState("New York, USA");
  const [clinic, setClinic] = useState(clinicOptions["New York, USA"][0]);
  const [patientName, setPatientName] = useState("");
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const role = localStorage.getItem("mediqueueRole");

      if (!user || role !== "doctor") {
        router.replace("/login");
        return;
      }

      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLocationChange = (value) => {
    setLocation(value);
    setClinic(clinicOptions[value][0]);
  };

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

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">
          Checking access...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              Doctor Tools
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
              Add Walk-in Patient
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Add an in-person patient directly to today&apos;s live queue.
            </p>
          </div>

          <Link
            href="/doctor-dashboard"
            className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-900 transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <form
          onSubmit={addPatient}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-5 sm:p-8 mt-8 flex flex-col gap-5"
        >
          <div>
            <label className="font-semibold text-sm">Select Location</label>
            <select
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
            >
              {Object.keys(clinicOptions).map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Select Clinic</label>
            <select
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              className="mt-2 w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-3 rounded-xl outline-none focus:border-blue-500"
            >
              {clinicOptions[location].map((clinicName) => (
                <option key={clinicName}>{clinicName}</option>
              ))}
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