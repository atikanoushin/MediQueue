import Link from "next/link";
export default function DoctorProfilePage() {
  const slots = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
  ];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Dr. Sarah Ahmed
      </h1>

      <p className="mt-2">
        Cardiologist
      </p>

      <p className="mt-4">
        Available Slots
      </p>

      <div className="flex gap-3 mt-3 flex-wrap">
        {slots.map((slot) => (
          <button
            key={slot}
            className="border px-4 py-2 rounded"
          >
            {slot}
          </button>
        ))}
      </div>

      <Link href="/confirmation" className="inline-block mt-8 bg-blue-600 text-white px-6 py-2 rounded"> Book Appointment </Link>
    </main>
  );
}