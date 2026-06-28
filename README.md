# MediQueue

> **Find the fastest appropriate healthcare, not just the nearest one.**

MediQueue is an intelligent healthcare queue management platform that helps patients find the fastest appropriate medical care by combining symptom analysis, clinic specialty matching, estimated travel time, and real-time queue information.

Instead of simply recommending the closest hospital, MediQueue recommends the option that gets patients treated the fastest while helping clinics manage appointments and patient flow efficiently.

---

# Inspiration

This project began with a personal experience.

One day my mother experienced chest pain, and we immediately went to the large hospital we knew. We waited in the queue for almost **2.5 hours** before she could be seen.

Later, we discovered there was a nearby urgent care center that had almost no waiting time at that moment.

That experience made me realize something simple:

Patients often don't know **where they can receive the fastest appropriate treatment**. They usually go to the biggest or most familiar hospital, even when another nearby clinic could safely treat them much sooner.

Doctors and clinics face a different challenge. They often have uneven patient loads some clinics are overwhelmed with long queues while others nearby have available capacity. Without better visibility, both patients and healthcare providers lose valuable time.

That experience inspired MediQueue.

Instead of only helping people find doctors, MediQueue helps patients find the **fastest appropriate care** by combining symptom analysis, specialty matching, travel time, and live queue information. At the same time, it gives healthcare providers better tools to manage appointments, walk-in patients, digital prescriptions, and live queues more efficiently.


---

# What MediQueue Does

### 👤 Patient Features

* Smart symptom-based care finder
* Emergency symptom detection
* Invalid symptom detection
* Location-aware clinic recommendations
* Fastest treatment recommendation
* Compare multiple nearby care options
* Online appointment booking
* Smart queue prediction
* Leave-Time Assistant
* Live queue tracking
* Resume booking after login
* Dark mode

---

### 👨‍⚕️ Doctor Features

* Doctor dashboard
* Live patient queue
* Walk-in patient registration
* Appointment management
* Digital prescription generator
* PDF prescription download
* Queue completion workflow

---

# How MediQueue Makes Decisions

Instead of recommending the closest clinic, MediQueue follows a transparent decision workflow.

1. Analyze patient symptoms
2. Detect emergency conditions
3. Match the correct medical specialty
4. Compare nearby clinics
5. Calculate:

* travel time
* queue wait
* treatment delay

6. Recommend the fastest appropriate treatment option.

---

# Tech Stack

### Frontend

* Next.js 16
* React
* Tailwind CSS

### Backend

* Next.js API Routes

### Authentication

* Firebase Authentication

### Database

* Firebase Firestore

### PDF Generation

* jsPDF

### Deployment

* Vercel

---

# Features Built During Hackathon

* Smart QuickCare Locator
* Emergency Detection
* Invalid Symptom Detection
* Dynamic Doctor Profiles
* Appointment Booking
* Walk-in Patient Registration
* Live Queue Management
* Smart Queue Prediction
* Leave-Time Assistant
* PDF Prescription Generator
* Dark Mode
* Responsive Mobile Design
* Resume Booking After Login
* Role-based Authentication

---

# Project Structure

```text
app/
components/
context/
data/
lib/
public/
```

---

# Demo Accounts

## Doctor

Email

```text
demo.doctor@mediqueue.com
```

Password

```text
321Free#
```

---

## Patient

Email

```text
demo.patient@mediqueue.com
```

Password

```text
123free@
```

---

# Local Setup

Clone the repository

```bash
git clone https://github.com/atikanoushin/MediQueue.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```text
http://localhost:3000
```

---

# Future Improvements

* GPS-based live travel estimation
* AI-powered symptom analysis
* Real clinic integrations
* Real-time queue synchronization
* Push notifications
* Electronic Health Record integration
* Insurance support

---

# Built for H0: Hack the Zero Stack with Vercel v0 and AWS Databases

MediQueue was built to reduce unnecessary waiting, improve healthcare accessibility, and help patients receive treatment faster through intelligent queue-aware recommendations.
