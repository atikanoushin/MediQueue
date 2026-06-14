"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardCard from "@/components/DashboardCard";

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    if (data.success) {
      setAppointments(data.appointments);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Doctor Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome back, Doctor
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <DashboardCard
          title="Today's Appointments"
          description={
            loading
              ? "Loading..."
              : `${appointments.length} Scheduled`
          }
        />

        <div>
          <DashboardCard
            title="Queue Status"
            description={
              loading
                ? "Loading..."
                : `${appointments.length} Patients Waiting`
            }
          />

          <Link
            href="/doctor-queue"
            className="inline-block mt-3 text-blue-600"
          >
            Open Queue →
          </Link>
        </div>

        <div>
          <DashboardCard
            title="Prescriptions"
            description="Create and manage prescriptions"
          />

          <Link
            href="/prescription"
            className="inline-block mt-3 text-blue-600"
          >
            Open →
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">
          Today's Appointment List
        </h2>

        <div className="mt-4 space-y-3">
          {loading && <p>Loading appointments...</p>}

          {!loading && appointments.length === 0 && (
            <p>No appointments booked yet.</p>
          )}

          {!loading &&
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border p-4 rounded-lg shadow"
              >
                <h3 className="font-bold">
                  {appointment.patientName}
                </h3>

                <p>
                  Doctor: {appointment.doctorName}
                </p>

                <p>
                  Time: {appointment.time}
                </p>

                <p>
                  Status: {appointment.status}
                </p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}