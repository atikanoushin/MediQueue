"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareFinderPage() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);

  const findCare = (customSymptom) => {
    const input = customSymptom || symptom;
    const text = input.toLowerCase();

    if (customSymptom) {
      setSymptom(customSymptom);
    }

    if (
      text.includes("burn") ||
      text.includes("burned") ||
      text.includes("fire") ||
      text.includes("hot water")
    ) {
      setResult({
        specialty: "Urgent Care",
        urgency: "Moderate urgency",
        reason:
          "Burn injuries may need quick evaluation to prevent infection and reduce tissue damage.",
        savedTime: "1h 28m",
        options: [
          {
            clinic: "Buffalo Urgent Care",
            wait: "12 minutes",
            distance: "2.4 miles",
            tag: "Best Match",
          },
          {
            clinic: "Community Health Clinic",
            wait: "25 minutes",
            distance: "1.8 miles",
            tag: "Closest",
          },
          {
            clinic: "Main Hospital ER",
            wait: "1 hour 40 minutes",
            distance: "3.1 miles",
            tag: "Emergency Backup",
          },
        ],
      });
    } else if (
      text.includes("wrist") ||
      text.includes("bone") ||
      text.includes("arm") ||
      text.includes("leg") ||
      text.includes("sprain")
    ) {
      setResult({
        specialty: "Orthopedics",
        urgency: "Non-emergency",
        reason:
          "Your symptoms may need bone, joint, or injury care. We found orthopedic options with shorter wait times.",
        savedTime: "2h 55m",
        options: [
          {
            clinic: "Buffalo Community Clinic",
            wait: "15 minutes",
            distance: "4.2 miles",
            tag: "Best Match",
          },
          {
            clinic: "Northside Orthopedic Care",
            wait: "35 minutes",
            distance: "2.9 miles",
            tag: "Nearby",
          },
          {
            clinic: "Main Hospital Orthopedics",
            wait: "3 hours 10 minutes",
            distance: "5.4 miles",
            tag: "Long Wait",
          },
        ],
      });
    } else if (text.includes("heart") || text.includes("chest")) {
      setResult({
        specialty: "Urgent Cardiac Care",
        urgency: "High urgency",
        reason:
          "Chest-related symptoms can be serious. We recommend the fastest available cardiac care option nearby.",
        savedTime: "37 min",
        options: [
          {
            clinic: "Buffalo Heart Center",
            wait: "8 minutes",
            distance: "3.5 miles",
            tag: "Fastest",
          },
          {
            clinic: "Main Hospital Emergency Department",
            wait: "45 minutes",
            distance: "2.8 miles",
            tag: "Emergency",
          },
          {
            clinic: "Downtown Urgent Care",
            wait: "20 minutes",
            distance: "4.1 miles",
            tag: "Alternative",
          },
        ],
      });
    } else if (text.includes("skin") || text.includes("rash")) {
      setResult({
        specialty: "Dermatology",
        urgency: "Non-emergency",
        reason:
          "Your symptoms match dermatology-related care. These clinics have faster queues than larger hospitals nearby.",
        savedTime: "1h 30m",
        options: [
          {
            clinic: "Dermacare Clinic",
            wait: "10 minutes",
            distance: "2.1 miles",
            tag: "Best Match",
          },
          {
            clinic: "Community Skin Center",
            wait: "30 minutes",
            distance: "1.9 miles",
            tag: "Nearby",
          },
          {
            clinic: "City Hospital Dermatology",
            wait: "1 hour 40 minutes",
            distance: "4.8 miles",
            tag: "Long Wait",
          },
        ],
      });
    } else if (text.includes("head") || text.includes("headache")) {
      setResult({
        specialty: "Neurology",
        urgency: "Moderate urgency",
        reason:
          "Headache-related symptoms may require neurological evaluation if persistent or severe.",
        savedTime: "1h 55m",
        options: [
          {
            clinic: "Buffalo Neuro Center",
            wait: "25 minutes",
            distance: "5.0 miles",
            tag: "Best Match",
          },
          {
            clinic: "Downtown Medical Clinic",
            wait: "40 minutes",
            distance: "2.6 miles",
            tag: "Closer",
          },
          {
            clinic: "Main Hospital Neurology",
            wait: "2 hours 20 minutes",
            distance: "4.7 miles",
            tag: "Long Wait",
          },
        ],
      });
    } else if (
      text.includes("fever") ||
      text.includes("cough") ||
      text.includes("flu") ||
      text.includes("cold")
    ) {
      setResult({
        specialty: "General Medicine",
        urgency: "General care",
        reason:
          "Fever, cough, and flu symptoms are usually best handled first by general medicine or primary care.",
        savedTime: "57 min",
        options: [
          {
            clinic: "Community Primary Care",
            wait: "18 minutes",
            distance: "1.6 miles",
            tag: "Best Match",
          },
          {
            clinic: "Buffalo Family Clinic",
            wait: "22 minutes",
            distance: "2.3 miles",
            tag: "Nearby",
          },
          {
            clinic: "Main Hospital Outpatient",
            wait: "1 hour 15 minutes",
            distance: "4.4 miles",
            tag: "Long Wait",
          },
        ],
      });
    } else {
      setResult({
        specialty: "General Medicine",
        urgency: "General care",
        reason:
          "We could not identify a specific specialty from your description, so we recommend starting with general medicine.",
        savedTime: "50 min",
        options: [
          {
            clinic: "Buffalo Medical Center",
            wait: "30 minutes",
            distance: "3.0 miles",
            tag: "Best Match",
          },
          {
            clinic: "Community Primary Care",
            wait: "50 minutes",
            distance: "2.5 miles",
            tag: "Nearby",
          },
          {
            clinic: "Main Hospital Outpatient",
            wait: "1 hour 20 minutes",
            distance: "4.6 miles",
            tag: "Long Wait",
          },
        ],
      });
    }
  };

  const bestOption = result?.options[0];
  const otherOptions = result?.options.slice(1);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <p className="text-blue-600 font-semibold">
              QuickCare Locator
            </p>

            <h1 className="text-5xl font-extrabold mt-3">
              Find the fastest appropriate care.
            </h1>

            <p className="text-slate-500 mt-4 text-lg max-w-3xl">
              Describe your symptom and MediQueue compares nearby care options
              by specialty, distance, and live wait time.
            </p>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
            <p className="font-bold text-red-700">
              Emergency reminder
            </p>

            <p className="text-red-600 text-sm mt-2">
              If symptoms are severe, life-threatening, or rapidly worsening,
              call emergency services immediately.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mt-10">
          <label className="font-semibold">
            Describe your symptom
          </label>

          <textarea
            rows="4"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Example: My hand got burned with hot water."
            className="w-full border border-slate-200 rounded-xl p-4 mt-3 outline-none focus:border-blue-500"
          />

          <div className="flex flex-wrap gap-3 mt-4">
            {[
              "My hand got burned",
              "I sprained my wrist",
              "I have chest pain",
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

        {result && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
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
                  <div className="bg-blue-50 rounded-2xl p-5">
                    <p className="text-blue-600 text-sm font-semibold">
                      Current Wait
                    </p>
                    <p className="text-2xl font-extrabold mt-1">
                      {bestOption.wait}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">
                      Distance
                    </p>
                    <p className="text-2xl font-extrabold mt-1">
                      {bestOption.distance}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">
                      Care Type
                    </p>
                    <p className="text-2xl font-extrabold mt-1">
                      {result.specialty}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 mt-6">
                  <p className="font-bold">
                    Why this recommendation?
                  </p>

                  <p className="text-slate-600 mt-2">
                    {result.reason}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-8">
                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(bestOption.clinic)}&specialty=${encodeURIComponent(result.specialty)}`}
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
                <p className="text-blue-100 font-semibold">
                  WAIT TIME SAVED
                </p>

                <h3 className="text-5xl font-extrabold mt-4">
                  {result.savedTime}
                </h3>

                <p className="text-blue-100 mt-3">
                  compared with the slowest nearby option.
                </p>

                <div className="bg-white/15 rounded-2xl p-5 mt-8">
                  <p className="text-sm text-blue-100">
                    Fastest option
                  </p>

                  <p className="text-2xl font-bold mt-2">
                    {bestOption.clinic}
                  </p>
                </div>
              </aside>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold">
                Other Available Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {otherOptions.map((option) => (
                  <div
                    key={option.clinic}
                    className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-xl font-bold">
                        {option.clinic}
                      </h4>

                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {option.tag}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div>
                        <p className="text-slate-400 text-sm">
                          Wait
                        </p>
                        <p className="font-bold">
                          {option.wait}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">
                          Distance
                        </p>
                        <p className="font-bold">
                          {option.distance}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/appointment?doctor=${encodeURIComponent(option.clinic)}&specialty=${encodeURIComponent(result.specialty)}`}
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