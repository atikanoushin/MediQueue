"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentPage() {
  const router = useRouter();

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("Dr. Sarah Ahmed");
  const [specialty, setSpecialty] = useState("Cardiologist");
  const [date, setDate] = useState("June 20, 2026");
  const [time, setTime] = useState("5:00 PM");
  const [loading, setLoading] = useState(false);

  const bookAppointment = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientName,
        doctorName,
        specialty,
        date,
        time,
        queuePosition: 1,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      router.push("/confirmation");
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Book Appointment
      </h1>

      <form
        onSubmit={bookAppointment}
        className="mt-6 flex flex-col gap-4 max-w-md"
      >
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded"
        >
          <option>5:00 PM</option>
          <option>5:30 PM</option>
          <option>6:00 PM</option>
          <option>6:30 PM</option>
          <option>7:00 PM</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </main>
  );
}