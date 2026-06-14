export default function PrescriptionsPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Prescription History
      </h1>

      <div className="mt-6 border p-4 rounded">
        <h2 className="font-bold">
          Dr. Sarah Ahmed
        </h2>

        <p className="mt-2">
          Date: June 20, 2026
        </p>

        <p className="mt-2">
          Medicine: Napa Extra
        </p>

        <button className="mt-4 border px-4 py-2 rounded">
          Download PDF
        </button>
      </div>
    </main>
  );
}