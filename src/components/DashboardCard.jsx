export default function DashboardCard({
  title,
  description,
}) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg">
        {title}
      </h2>

      <p className="mt-2">
        {description}
      </p>
    </div>
  );
}