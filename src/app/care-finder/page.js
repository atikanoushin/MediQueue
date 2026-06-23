"use client";

import { useState } from "react";
import Link from "next/link";

const clinicData = {
  newyork: {
    urgent: ["Mount Sinai Urgent Care", "NYU Langone Ambulatory Care", "NewYork-Presbyterian ER"],
    ortho: ["NYU Langone Orthopedics", "Mount Sinai Orthopedics", "NewYork-Presbyterian Orthopedic Care"],
    cardio: ["Mount Sinai Heart", "NYU Langone Cardiology", "NewYork-Presbyterian Cardiac Care"],
    derma: ["Schweiger Dermatology Group", "NYU Langone Dermatology", "Mount Sinai Dermatology"],
    neuro: ["NewYork-Presbyterian Neurology", "NYU Langone Neurology", "Mount Sinai Neurology"],
    general: ["CityMD Urgent Care", "NYU Langone Primary Care", "Mount Sinai Primary Care"],
  },

  california: {
    urgent: ["UCLA Immediate Care", "Stanford Express Care", "Cedars-Sinai Urgent Care"],
    ortho: ["UCLA Orthopaedic Surgery", "Stanford Orthopaedics", "Cedars-Sinai Orthopedics"],
    cardio: ["Stanford Cardiology", "UCLA Cardiology", "Cedars-Sinai Heart Institute"],
    derma: ["UCLA Dermatology", "Stanford Dermatology", "Cedars-Sinai Dermatology"],
    neuro: ["UCLA Neurology", "Stanford Neurology", "Cedars-Sinai Neurology"],
    general: ["UCLA Primary Care", "Stanford Primary Care", "Cedars-Sinai Primary Care"],
  },

  dhaka: {
    urgent: ["Ibn Sina Diagnostic & Consultation Center", "Square Hospital Emergency", "Dhaka Medical College Hospital"],
    ortho: ["Ibn Sina Orthopedic Center", "Square Hospital Orthopedics", "Dhaka Medical Orthopedic Unit"],
    cardio: ["National Heart Foundation", "Ibn Sina Cardiac Center", "Square Hospital Cardiology"],
    derma: ["Ibn Sina Dermatology", "Square Hospital Dermatology", "Popular Diagnostic Dermatology"],
    neuro: ["National Institute of Neurosciences", "Square Hospital Neurology", "Ibn Sina Neurology"],
    general: ["Popular Diagnostic Center", "Ibn Sina Medical Center", "Square Hospital Outpatient"],
  },

  delhi: {
    urgent: ["Apollo Urgent Care", "Max Healthcare Emergency", "AIIMS Emergency"],
    ortho: ["Apollo Orthopedics", "Max Orthopedics", "AIIMS Orthopedic Department"],
    cardio: ["Apollo Heart Institute", "Max Cardiology", "AIIMS Cardiology"],
    derma: ["Apollo Dermatology", "Max Dermatology", "AIIMS Dermatology"],
    neuro: ["AIIMS Neurology", "Apollo Neurology", "Max Neurosciences"],
    general: ["Apollo Primary Care", "Max Healthcare OPD", "AIIMS OPD"],
  },

  karachi: {
    urgent: ["Aga Khan Urgent Care", "Liaquat National Emergency", "Jinnah Hospital Emergency"],
    ortho: ["Aga Khan Orthopedics", "Liaquat National Orthopedics", "Jinnah Hospital Orthopedic Unit"],
    cardio: ["National Institute of Cardiovascular Diseases", "Aga Khan Cardiology", "Liaquat National Cardiology"],
    derma: ["Aga Khan Dermatology", "Liaquat National Dermatology", "South City Dermatology"],
    neuro: ["Aga Khan Neurology", "Liaquat National Neurology", "Jinnah Hospital Neurology"],
    general: ["Aga Khan Family Medicine", "Liaquat National OPD", "South City Hospital OPD"],
  },

  toronto: {
    urgent: ["Toronto General Emergency", "Sunnybrook Urgent Care", "North York General Emergency"],
    ortho: ["Sunnybrook Orthopaedics", "Toronto Western Orthopedics", "North York General Orthopedics"],
    cardio: ["Toronto General Cardiology", "Sunnybrook Cardiology", "St. Michael’s Cardiac Care"],
    derma: ["Toronto Dermatology Centre", "Sunnybrook Dermatology", "Women’s College Dermatology"],
    neuro: ["Toronto Western Neurology", "Sunnybrook Neurology", "Toronto General Neurology"],
    general: ["North York General Primary Care", "Toronto General Outpatient", "Sunnybrook Family Medicine"],
  },
};

export default function CareFinderPage() {
  const [symptom, setSymptom] = useState("");
  const [location, setLocation] = useState("newyork");
  const [result, setResult] = useState(null);

  const buildResult = ({ specialty, urgency, reason, savedTime, type }) => {
    const clinics = clinicData[location][type];

    setResult({
      specialty,
      urgency,
      reason,
      savedTime,
      options: [
  {
    clinic: clinics[0],
    wait: "12 minutes",
    waitMinutes: 12,
    travelMinutes: 8,
    treatmentDelayMinutes: 5,
    totalTreatmentMinutes: 25,
    distance: "2.4 miles",
    tag: "Best Match",
  },
  {
    clinic: clinics[1],
    wait: "25 minutes",
    waitMinutes: 25,
    travelMinutes: 13,
    treatmentDelayMinutes: 8,
    totalTreatmentMinutes: 46,
    distance: "3.1 miles",
    tag: "Nearby",
  },
  {
    clinic: clinics[2],
    wait: "1 hour 40 minutes",
    waitMinutes: 100,
    travelMinutes: 18,
    treatmentDelayMinutes: 15,
    totalTreatmentMinutes: 133,
    distance: "5.2 miles",
    tag: "Long Wait",
  },
],
    });
  };

  const findCare = (customSymptom) => {
    const input = customSymptom || symptom;
    if (!input.trim()) {
  alert("Please describe your symptom first.");
  return;
}

const text = input.toLowerCase();
if (
  text.includes("difficulty breathing") ||
  text.includes("can't breathe") ||
  text.includes("heart attack") ||
  text.includes("stroke") ||
  text.includes("unconscious") ||
  text.includes("severe bleeding") ||
  text.includes("not breathing") ||
  text.includes("choking")
) {
  setResult({
    emergency: true,
    message:
      "Your symptoms may require immediate emergency care. Do not wait in a clinic queue. Call emergency services or visit the nearest emergency department immediately.",
  });

  return;
}

    if (customSymptom) setSymptom(customSymptom);

    if (
      text.includes("burn") ||
      text.includes("burned") ||
      text.includes("fire") ||
      text.includes("hot water")
    ) {
      buildResult({
        specialty: "Urgent Care",
        urgency: "Moderate urgency",
        savedTime: "1h 28m",
        type: "urgent",
        reason:
          "Burn injuries may need quick evaluation to prevent infection and reduce tissue damage.",
      });
    } else if (
      text.includes("wrist") ||
      text.includes("bone") ||
      text.includes("arm") ||
      text.includes("leg") ||
      text.includes("sprain")
    ) {
      buildResult({
        specialty: "Orthopedics",
        urgency: "Non-emergency",
        savedTime: "2h 55m",
        type: "ortho",
        reason:
          "Your symptoms may need bone, joint, or injury care. We found orthopedic options with shorter wait times.",
      });
    } else if (text.includes("heart") || text.includes("chest")) {
      buildResult({
        specialty: "Urgent Cardiac Care",
        urgency: "High urgency",
        savedTime: "37 min",
        type: "cardio",
        reason:
          "Chest-related symptoms can be serious. We recommend the fastest available cardiac care option nearby.",
      });
    } else if (text.includes("skin") || text.includes("rash")) {
      buildResult({
        specialty: "Dermatology",
        urgency: "Non-emergency",
        savedTime: "1h 30m",
        type: "derma",
        reason:
          "Your symptoms match dermatology-related care. These clinics have faster queues than larger hospitals nearby.",
      });
    } else if (text.includes("head") || text.includes("headache")) {
      buildResult({
        specialty: "Neurology",
        urgency: "Moderate urgency",
        savedTime: "1h 55m",
        type: "neuro",
        reason:
          "Headache-related symptoms may require neurological evaluation if persistent or severe.",
      });
    } else if (
      text.includes("fever") ||
      text.includes("cough") ||
      text.includes("flu") ||
      text.includes("cold")
    ) {
      buildResult({
        specialty: "General Medicine",
        urgency: "General care",
        savedTime: "57 min",
        type: "general",
        reason:
          "Fever, cough, and flu symptoms are usually best handled first by general medicine or primary care.",
      });
    } else {
      buildResult({
        specialty: "General Medicine",
        urgency: "General care",
        savedTime: "50 min",
        type: "general",
        reason:
          "We could not identify a specific specialty from your description, so we recommend starting with general medicine.",
      });
    }
  };

const bestOption = result?.emergency
  ? null
  : result?.options?.[0];

const otherOptions = result?.emergency
  ? []
  : result?.options?.slice(1) || [];
const slowestOption = result?.options?.[2] || null;
const minutesSaved =
  bestOption && slowestOption
    ? slowestOption.totalTreatmentMinutes - bestOption.totalTreatmentMinutes
    : 0;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <section className="max-w-6xl mx-auto px-6 py-12 text-slate-900 dark:text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <p className="text-blue-600 font-semibold">QuickCare Locator</p>

            <h1 className="text-5xl font-extrabold mt-3">
              Find the fastest appropriate care.
            </h1>

            <p className="text-slate-500 mt-4 text-lg max-w-3xl">
              Describe your symptom, choose your location, and MediQueue
              compares nearby care options by specialty, distance, and live wait time.
            </p>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
            <p className="font-bold text-red-700">Emergency reminder</p>
            <p className="text-red-600 text-sm mt-2">
              If symptoms are severe, life-threatening, or rapidly worsening,
              call emergency services immediately.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 mt-10">
          <label className="font-semibold">Choose your location</label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-3 mt-3 outline-none focus:border-blue-500">
            <option value="newyork">New York, USA</option>
            <option value="california">California, USA</option>
            <option value="dhaka">Dhaka, Bangladesh</option>
            <option value="delhi">New Delhi, India</option>
            <option value="karachi">Karachi, Pakistan</option>
            <option value="toronto">Toronto, Canada</option>
          </select>

          <label className="font-semibold block mt-6">
            Describe your symptom
          </label>

          <textarea
            rows="4"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Example: My hand got burned with hot water."
            className="w-full border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-xl p-4 mt-3 outline-none focus:border-blue-500"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            {[
  "My hand got burned",
  "I sprained my wrist",
  "I have chest pain",
  "Difficulty breathing",
  "Skin rash",
  "Fever and cough",
].map((example) => (
              <button
                key={example}
                onClick={() => findCare(example)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {example}
              </button>
            ))}
          </div>

          <button
            onClick={() => findCare()}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Find Fastest Care
          </button>
        </div>

        {result?.emergency && (
  <div className="mt-8 bg-red-50 border-2 border-red-500 rounded-3xl p-8 shadow-sm">
    <p className="text-red-600 font-bold text-lg">
      🚨 EMERGENCY DETECTED
    </p>

    <h2 className="text-3xl font-extrabold mt-3 text-red-700">
      Seek Immediate Medical Attention
    </h2>

    <p className="mt-4 text-red-600 text-lg">
      {result.message}
    </p>

    <div className="bg-red-100 rounded-2xl p-5 mt-6">
      <p className="font-semibold text-red-700">
        Recommended Action
      </p>

      <p className="mt-2 text-red-600">
        Call emergency services or go directly to the nearest emergency room.
      </p>
    </div>
  </div>
)}

{result && !result.emergency && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-green-600 font-semibold">
                    BEST MATCH FOUND
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      result.urgency === "High urgency"
                        ? "bg-red-100 text-red-700"
                        : result.urgency === "Moderate urgency"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {result.urgency}
                  </span>
                </div>

                <h2 className="text-3xl font-extrabold mt-4">
                  {bestOption.clinic}
                </h2>

                <p className="text-slate-500 mt-2">
                  Recommended specialty:{" "}
                  <span className="font-semibold text-slate-800">
                    {result.specialty}
                  </span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                  <div className="bg-blue-50 dark:bg-blue-500/15 rounded-2xl p-5">
                    <p className="text-blue-600 text-sm font-semibold">
                      Current Wait
                    </p>
                    <p className="text-2xl font-extrabold mt-1">
                      {bestOption.wait}
                    </p>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">Distance</p>
                    <p className="text-2xl font-extrabold mt-1">
                      {bestOption.distance}
                    </p>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">Care Type</p>
                    <p className="text-2xl font-extrabold mt-1">
                      {result.specialty}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-500/15 rounded-2xl p-5 mt-6 border border-green-100 dark:border-green-400/30">
  <p className="text-green-600 dark:text-green-300 text-sm font-semibold">
    TOTAL TIME TO TREATMENT
  </p>

  <h3 className="text-4xl font-extrabold mt-2 text-green-700 dark:text-green-300">
    {bestOption.totalTreatmentMinutes} min
  </h3>

  <p className="text-slate-600 dark:text-slate-300 mt-2">
    Includes estimated travel time, current queue wait, and treatment delay.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
    <div>
      <p className="text-slate-400 text-sm">Travel</p>
      <p className="font-bold">{bestOption.travelMinutes} min</p>
    </div>

    <div>
      <p className="text-slate-400 text-sm">Queue</p>
      <p className="font-bold">{bestOption.waitMinutes} min</p>
    </div>

    <div>
      <p className="text-slate-400 text-sm">Clinic Delay</p>
      <p className="font-bold">{bestOption.treatmentDelayMinutes} min</p>
    </div>
  </div>
</div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5 mt-6">
                  <p className="font-bold">Why this recommendation?</p>
                  <p className="text-slate-600 mt-2">{result.reason}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-8">
                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(
                      bestOption.clinic
                    )}&specialty=${encodeURIComponent(result.specialty)}`}
                    className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Book Best Option
                  </Link>

                  <Link
                    href="/patient-queue"
                    className="flex-1 border border-blue-600 text-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                  >
                    View Queue
                  </Link>
                </div>
              </div>

              <aside className="bg-blue-600 text-white rounded-3xl p-8 shadow-sm">
                <p className="text-blue-100 font-semibold">WAIT TIME SAVED</p>

                <h3 className="text-5xl font-extrabold mt-4">
                  {minutesSaved} min
                </h3>

                <p className="text-blue-100 mt-3">
                  saved compared with the slowest nearby option.
                </p>

                <div className="bg-white/15 rounded-2xl p-5 mt-8">
                  <p className="text-sm text-blue-100">Fastest option</p>
                  <p className="text-2xl font-bold mt-2">
                    {bestOption.clinic}
                  </p>
                </div>
              </aside>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold">Other Available Options</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {otherOptions.map((option) => (
                  <div
                    key={option.clinic}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-xl font-bold">{option.clinic}</h4>

                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {option.tag}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div>
                        <p className="text-slate-400 text-sm">Wait</p>
                        <p className="font-bold">{option.wait}</p>
                      </div>

                      <div>
                        <p className="text-slate-400 text-sm">Distance</p>
                        <p className="font-bold">{option.distance}</p>
                      </div>
                    </div>

                    <Link
                      href={`/appointment?doctor=${encodeURIComponent(
                        option.clinic
                      )}&specialty=${encodeURIComponent(result.specialty)}`}
                      className="inline-block mt-5 text-blue-600 font-semibold"
                    >
                      Book this option →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}