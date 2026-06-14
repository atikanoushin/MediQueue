import DashboardCard from "@/components/DashboardCard";
import Link from "next/link";
import { appointments } from "@/data/appointments";

export default function PatientDashboardPage() {
  const appointment = appointments[0];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Patient Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome back, {appointment.patientName}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div>
          <DashboardCard
            title="Upcoming Appointment"
            description={`${appointment.doctorName} - ${appointment.time}`}
          />
        </div>

        <div>
          <DashboardCard
            title="Queue Status"
            description={`Position #${appointment.queuePosition}`}
          />

          <Link
            href="/patient-queue"
            className="inline-block mt-3 text-blue-600"
          >
            View Queue →
          </Link>
        </div>

        <div>
          <DashboardCard
            title="Prescription History"
            description="View previous prescriptions"
          />

          <Link
            href="/prescription-history"
            className="inline-block mt-3 text-blue-600"
          >
            Open →
          </Link>
        </div>

      </div>
    </main>
  );
}