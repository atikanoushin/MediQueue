import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>MediQueue</h1>

      <ul>
        <li>
          <Link href="/doctor">Doctor Dashboard</Link>
        </li>

        <li>
          <Link href="/patient">Patient Dashboard</Link>
        </li>

        <li>
          <Link href="/doctors">Find Doctors</Link>
        </li>

        <li>
          <Link href="/appointment">Appointments</Link>
        </li>
        <li> <Link href="/doctor-queue"> Doctor Queue</Link>
        </li>
        <li><Link href="/patient-queue">Patient Queue</Link>
        </li>
        <li><Link href="/doctor-dashboard">Doctor Dashboard</Link>
        </li>
        <li><Link href="/patient-dashboard">Patient Dashboard</Link>
        </li>
        <li><Link href="/login">Login</Link>
        </li>
      </ul>
    </main>
  );
}