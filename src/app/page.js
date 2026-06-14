import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>MediQueue</h1>

      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>

        <li>
          <Link href="/doctors">Find Doctors</Link>
        </li>

        <li>
          <Link href="/appointment">Book Appointment</Link>
        </li>

        <li>
          <Link href="/doctor-dashboard">Doctor Dashboard</Link>
        </li>

        <li>
          <Link href="/patient-dashboard">Patient Dashboard</Link>
        </li>
      </ul>
    </main>
  );
}