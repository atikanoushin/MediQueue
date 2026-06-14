"use client";

import { useEffect, useState } from "react";

export default function DoctorQueuePage() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchQueue = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success) {
      setQueue(data.appointments);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleNextPatient = async () => {
    const currentPatient = queue[0];

    if (!currentPatient) {
      return;
    }

    setUpdating(true);

    const response = await fetch(`/api/appointments?id=${currentPatient.id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      await fetchQueue();
    } else {
      alert(data.error);
    }

    setUpdating(false);
  };

  const currentPatient = queue[0];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Live Doctor Queue
      </h1>

      {loading && <p className="mt-6">Loading queue...</p>}

      {!loading && (
        <>
          <div className="mt-6 border p-4 rounded">
            <h2 className="font-bold">
              Current Patient
            </h2>

            <p className="mt-2">
              {currentPatient
                ? currentPatient.patientName
                : "No Patients"}
            </p>

            {currentPatient && (
              <p className="mt-1 text-gray-600">
                {currentPatient.time} • {currentPatient.status}
              </p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="font-bold">
              Upcoming Patients
            </h2>

            <ul className="mt-3">
              {queue.slice(1).map((appointment) => (
                <li
                  key={appointment.id}
                  className="border p-3 mb-2 rounded"
                >
                  <p className="font-semibold">
                    {appointment.patientName}
                  </p>

                  <p className="text-gray-600">
                    {appointment.time} • {appointment.doctorName}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleNextPatient}
            disabled={updating || !currentPatient}
            className="mt-6 border px-4 py-2 rounded"
          >
            {updating ? "Updating..." : "Next Patient"}
          </button>
        </>
      )}
    </main>
  );
}