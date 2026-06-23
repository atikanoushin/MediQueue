"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PatientQueuePage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success) {
      setAppointments(data.appointments);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchQueue();

    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const currentPatient = sortedAppointments[0];
  const myAppointment = sortedAppointments[sortedAppointments.length - 1];
  const myPosition = sortedAppointments.length;

  const recentVisitTimes = [4, 6, 5, 8, 4, 7];

const averageDoctorTime =
  recentVisitTimes.reduce((total, time) => total + time, 0) /
  recentVisitTimes.length;

const roundedAverageDoctorTime = Math.round(averageDoctorTime);

const travelTime = 11;
const bufferTime = 3;

  const estimatedWait = myAppointment
  ? Math.round((myPosition - 1) * averageDoctorTime)
  : 0;
  const leaveIn = Math.max(estimatedWait - travelTime - bufferTime, 0);

  let alertMessage = "You have enough time before leaving.";
  let alertStyle =
    "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300";

  if (leaveIn === 0 && myAppointment) {
    alertMessage = "You should leave now to arrive on time.";
    alertStyle =
      "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";
  } else if (leaveIn <= 5 && myAppointment) {
    alertMessage = "Queue is moving soon. Get ready to leave.";
    alertStyle =
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300";
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Smart Queue Prediction
          </p>

          <h1 className="text-4xl font-extrabold mt-2">
            Queue Status
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Track your position and know exactly when to leave.
          </p>
        </div>

        {loading && (
          <p className="mt-8 text-slate-500 dark:text-slate-400">
            Loading queue...
          </p>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  CURRENT PATIENT
                </p>

                <h2 className="text-4xl font-extrabold mt-3">
                  {currentPatient ? currentPatient.patientName : "No Patients"}
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Doctor is currently seeing this patient.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">Your Name</p>
                    <p className="font-bold text-lg mt-1">
                      {myAppointment
                        ? myAppointment.patientName
                        : "No appointment"}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-500/15 rounded-2xl p-5">
                    <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
                      Your Position
                    </p>
                    <p className="font-extrabold text-3xl text-blue-600 dark:text-blue-300 mt-1">
                      {myAppointment ? `#${myPosition}` : "-"}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">
                      Estimated Wait
                    </p>
                    <p className="font-bold text-lg mt-1">
                      {estimatedWait} min
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">
                      Avg Doctor Time
                    </p>
                    <p className="font-bold text-lg mt-1">
                      {roundedAverageDoctorTime} min / patient
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">
                      Travel Time
                    </p>
                    <p className="font-bold text-lg mt-1">
                      {travelTime} min
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5">
                    <p className="text-slate-400 text-sm">
                      Safety Buffer
                    </p>
                    <p className="font-bold text-lg mt-1">
                      {bufferTime} min
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-500/15 rounded-2xl p-5 mt-5 border border-blue-100 dark:border-blue-400/30">
  <p className="text-blue-600 dark:text-blue-300 text-sm font-semibold">
    QUEUE SPEED LEARNING
  </p>

  <h3 className="text-xl font-bold mt-2">
  Dynamic Wait Prediction
</h3>

  <p className="text-slate-500 dark:text-slate-400 mt-2">
    MediQueue estimates wait time using recent visit durations instead of a
    fixed number for every patient.
  </p>

  <div className="flex flex-wrap gap-2 mt-4">
    {recentVisitTimes.map((time, index) => (
      <span
        key={index}
        className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1 rounded-full text-sm font-semibold"
      >
        {time} min
      </span>
    ))}
  </div>
</div>
                </div>
              </div>

              <aside className="bg-blue-600 text-white rounded-3xl shadow-sm p-8">
                <p className="text-blue-100 font-semibold">
                  LEAVE-TIME ASSISTANT
                </p>

                <h2 className="text-6xl font-extrabold mt-4">
                  {myAppointment ? `${leaveIn}` : "-"}
                </h2>

                <p className="text-blue-100 mt-3">
                  minutes until you should leave
                </p>

                <div className="bg-white/15 rounded-2xl p-5 mt-8">
                  <p className="text-sm text-blue-100">
                    Estimated clinic wait
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {estimatedWait} min
                  </p>
                </div>

                <div className="bg-white/15 rounded-2xl p-5 mt-4">
                  <p className="text-sm text-blue-100">
                    Estimated travel time
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {travelTime} min
                  </p>
                </div>
              </aside>
            </div>

            <div className={`mt-8 rounded-2xl p-5 font-semibold ${alertStyle}`}>
              {alertMessage}
            </div>

            <div className="mt-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm p-6">
              <p className="text-blue-600 dark:text-blue-400 font-semibold">
                SMART ALERT PREVIEW
              </p>

              <h3 className="text-2xl font-extrabold mt-3">
                {leaveIn === 0
                  ? "Leave now to arrive on time."
                  : `Leave in ${leaveIn} minutes.`}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 mt-3">
                MediQueue compares your queue position, average doctor time,
                estimated travel time, and safety buffer to recommend when you
                should leave.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                  <p className="text-slate-400 text-sm">Queue Wait</p>
                  <p className="font-bold">{estimatedWait} min</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                  <p className="text-slate-400 text-sm">Travel Time</p>
                  <p className="font-bold">{travelTime} min</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
                  <p className="text-slate-400 text-sm">Recommendation</p>
                  <p className="font-bold">
                    {leaveIn === 0 ? "Leave now" : `${leaveIn} min`}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-4 mt-8">
          <Link
            href="/patient-dashboard"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/appointment"
            className="border border-blue-600 text-blue-600 dark:text-blue-300 dark:border-blue-400 px-5 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-900 transition"
          >
            Book Another Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}