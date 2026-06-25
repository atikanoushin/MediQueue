"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DoctorQueuePage() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const fetchQueue = async () => {
    const response = await fetch(
      "/api/appointments?doctorEmail=" + auth.currentUser.email
    );
    const data = await response.json();

    if (data.success) {
      const sortedQueue = [...data.appointments].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setQueue(sortedQueue);
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      fetchQueue();
    });

    return () => unsubscribe();
  }, [router]);

  const handleNextPatient = async () => {
    const currentPatient = queue[0];

    if (!currentPatient) return;

    const confirmNext = confirm(
      `Mark ${currentPatient.patientName} as completed and move to the next patient?`
    );

    if (!confirmNext) return;

    setUpdating(true);

    const response = await fetch(
      `/api/appointments?id=${currentPatient.id}&userEmail=${currentPatient.userEmail}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      await fetchQueue();
    } else {
      alert(data.error);
    }

    setUpdating(false);
  };

  const currentPatient = queue[0];
  const upcomingPatients = queue.slice(1);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              Doctor Queue
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
              Live Doctor Queue
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              Manage current and upcoming patients in real time.
            </p>
          </div>

          <Link
            href="/doctor-dashboard"
            className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-900 transition"
          >
            Back to Dashboard
          </Link>
        </div>

        {loading && (
          <p className="mt-8 text-slate-500 dark:text-slate-400">
            Loading queue...
          </p>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-5 sm:p-8">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                CURRENT PATIENT
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 break-words">
                {currentPatient ? currentPatient.patientName : "No Patients"}
              </h2>

              {currentPatient ? (
                <>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">
                    {currentPatient.doctorName} • {currentPatient.time} •{" "}
                    {currentPatient.status}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5">
                      <p className="text-slate-400 text-sm">Specialty</p>
                      <p className="font-bold mt-1 break-words">
                        {currentPatient.specialty}
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-500/15 rounded-2xl p-5">
                      <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
                        Queue Position
                      </p>
                      <p className="font-extrabold text-3xl text-blue-600 dark:text-blue-300 mt-1">
                        #1
                      </p>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5">
                      <p className="text-slate-400 text-sm">Visit Status</p>
                      <p className="font-bold mt-1">In Progress</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link
                      href={`/prescription?patient=${encodeURIComponent(
                        currentPatient.patientName
                      )}`}
                      className="flex-1 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Write Prescription
                    </Link>

                    <button
                      onClick={handleNextPatient}
                      disabled={updating}
                      className="flex-1 border border-green-600 text-green-700 dark:text-green-300 dark:border-green-400 py-3 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-green-500/10 transition disabled:opacity-60"
                    >
                      {updating ? "Updating..." : "Complete & Next Patient"}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 mt-4">
                  No one is currently waiting in the queue.
                </p>
              )}
            </div>

            <aside className="bg-blue-600 text-white rounded-3xl shadow-sm p-5 sm:p-8">
              <p className="text-blue-100 font-semibold">QUEUE SUMMARY</p>

              <h2 className="text-5xl sm:text-6xl font-extrabold mt-4">
                {queue.length}
              </h2>

              <p className="text-blue-100 mt-3">total patients waiting</p>

              <div className="bg-white/15 rounded-2xl p-5 mt-8">
                <p className="text-sm text-blue-100">Current patient</p>
                <p className="text-xl sm:text-2xl font-bold mt-2 break-words">
                  {currentPatient ? currentPatient.patientName : "None"}
                </p>
              </div>

              <div className="bg-white/15 rounded-2xl p-5 mt-4">
                <p className="text-sm text-blue-100">Upcoming</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">
                  {upcomingPatients.length}
                </p>
              </div>
            </aside>
          </div>
        )}

        {!loading && upcomingPatients.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-5 sm:p-8 mt-8">
            <h2 className="text-xl sm:text-2xl font-bold">
              Upcoming Patients
            </h2>

            <div className="mt-6 space-y-4">
              {upcomingPatients.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                      Queue #{index + 2}
                    </p>

                    <h3 className="font-bold text-lg mt-1 break-words">
                      {appointment.patientName}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400">
                      {appointment.doctorName} • {appointment.time}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold text-center">
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}