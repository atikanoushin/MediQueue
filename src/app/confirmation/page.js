import { appointments } from "@/data/appointments";

export default function ConfirmationPage() {
  const appointment = appointments[0];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Appointment Confirmed
      </h1>

      <p className="mt-4">
        Your appointment has been booked successfully.
      </p>

      <div className="mt-6 border p-4 rounded">
        <p>
          <strong>Doctor:</strong> {appointment.doctorName}
        </p>

        <p>
          <strong>Specialty:</strong> {appointment.specialty}
        </p>

        <p>
          <strong>Time:</strong> {appointment.time}
        </p>

        <p>
          <strong>Date:</strong> {appointment.date}
        </p>

        <p>
          <strong>Status:</strong> {appointment.status}
        </p>
      </div>
    </main>
  );
}