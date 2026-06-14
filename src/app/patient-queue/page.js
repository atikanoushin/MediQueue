"use client";

import { useEffect, useState } from "react";

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

  const currentPatient = appointments[0];
  const myAppointment = appointments[appointments.length - 1];
  const myPosition = appointments.length;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Queue Status
      </h1>

      {loading && <p className="mt-6">Loading queue...</p>}

      {!loading && (
        <div className="mt-6 border p-4 rounded">
          <p>
            Current Patient:{" "}
            {currentPatient ? currentPatient.patientName : "No Patients"}
          </p>

          <p className="mt-2">
            Your Name:{" "}
            {myAppointment ? myAppointment.patientName : "No appointment"}
          </p>

          <p className="mt-2">
            Your Position:{" "}
            {myAppointment ? `#${myPosition}` : "No position"}
          </p>

          <p className="mt-2">
            Estimated Wait:{" "}
            {myAppointment ? `${(myPosition - 1) * 5} minutes` : "0 minutes"}
          </p>

          <p className="mt-4 text-sm text-gray-600">
            Auto-refreshes every 5 seconds
          </p>
        </div>
      )}
    </main>
  );
}