import Link from "next/link";
import { doctors } from "@/data/doctors";
export default function DoctorsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Find Doctors
      </h1>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">
              {doctor.name}
            </h2>

            <p>{doctor.specialty}</p>
            <p className="mt-1">Experience: {doctor.experience}
            </p>
            <p> Consultation Fee: ${doctor.fee}
            </p>
            <Link href="/doctor-profile" className="inline-block mt-3 border px-3 py-1 rounded">
            View Profile </Link>
          </div>
        ))}
      </div>
    </main>
  );
}