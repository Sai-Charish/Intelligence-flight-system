"use client";
import { useState } from "react";

const data = {
  archLayers: [
    {
      num: "01",
      name: "Frontend",
      detail: "React / Next.js  ·  Tailwind CSS",
      color: "bg-blue-50 text-blue-600",
    },
    {
      num: "02",
      name: "Backend API",
      detail: "Django REST Framework  ·  Python",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      num: "03",
      name: "Database",
      detail:
        "PostgreSQL  ·  Relational store for flights, bookings, price history",
      color: "bg-amber-50 text-amber-600",
    },
    {
      num: "04",
      name: "ML Pricing Engine",
      detail: "Scikit-learn  ·  Pandas  ·  NumPy",
      color: "bg-purple-50 text-purple-600",
    },
  ],
  features: [
    {
      num: "01 — Flight Search",
      title: "Search by route and date",
      body: "Users search flights by source city, destination city, and travel date. The system returns available flights along with the current dynamically calculated ticket price.",
      span: false,
    },
    {
      num: "02 — Booking System",
      title: "Seat reservation and tracking",
      body: "Users book seats on any available flight. Each booking records the user ID, flight ID, number of seats, total price, and timestamp. Seat availability updates in real time.",
      span: false,
    },
    {
      num: "03 — Price History",
      title: "Full price change audit trail",
      body: "Every price update is persisted in the price history table, enabling detailed analysis of how demand shifts affect pricing over time.",
      span: false,
    },
    {
      num: "04 — Dynamic Pricing",
      title: "ML-driven price prediction",
      body: "Prices are predicted using seats remaining, days before departure, historical demand, and booking pattern signals — replacing fixed base prices with adaptive estimates.",
      span: false,
    },
    {
      num: "05 — Synthetic Data Generator",
      title: "Realistic demand simulation at scale",
      body: "A data generator produces 200+ flights and 15,000+ bookings with dynamic demand behavior, providing a rich dataset for training and validating the pricing model.",
      span: true,
    },
  ],
  stack: [
    {
      cat: "Backend",
      tags: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
    },
    { cat: "Frontend", tags: ["React", "Next.js", "Tailwind CSS"] },
    { cat: "ML / Data", tags: ["Python", "Scikit-learn", "Pandas", "NumPy"] },
  ],
  tables: [
    {
      name: "cities",
      desc: "Airport city information",
      cols: ["Field", "Type", "Description"],
      rows: [
        ["id", "BigInt (PK)", "Unique identifier"],
        ["name", "VARCHAR", "Name of the city"],
        ["airport_code", "VARCHAR(3)", "IATA airport code (e.g. DEL)"],
      ],
    },
    {
      name: "flights",
      desc: "Flight details and pricing",
      cols: ["Field", "Type", "Description"],
      rows: [
        ["id", "BigInt (PK)", "Unique identifier"],
        ["flight_number", "VARCHAR", "Unique flight number (e.g. FL0450)"],
        ["date", "Date", "Departure date"],
        ["departure_time", "DateTime", "Scheduled departure"],
        ["arrival_time", "DateTime", "Scheduled arrival"],
        [
          "base_price",
          "Decimal",
          "Base ticket price before dynamic adjustment",
        ],
        ["total_seats", "Integer", "Total seat capacity"],
        ["destination_id", "FK → City", "Arrival city"],
        ["source_id", "FK → City", "Departure city"],
      ],
    },
    {
      name: "bookings",
      desc: "Ticket booking records",
      cols: ["Field", "Type", "Description"],
      rows: [
        ["id", "BigInt (PK)", "Unique identifier"],
        ["passenger", "Integer", "Count of passenger at time of booking"],
        ["seats", "Integer", "Number of seats reserved"],
        ["price_paid", "Decimal", "Total charge at time of booking"],
        ["booking_time", "DateTime", "Timestamp of reservation"],
        ["flight_id", "FK → Flight", "Associated flight"],
        ["user_id", "Integer", "Booking user reference"],
      ],
    },
    {
      name: "price_history",
      desc: "Historical price change log",
      cols: ["Field", "Type", "Description"],
      rows: [
        ["id", "BigInt (PK)", "Unique identifier"],
        ["price", "Decimal", "Price at time of record"],
        ["timestamp", "DateTime", "When the price was recorded"],
        ["flight_id", "FK → Flight", "Associated flight"],
      ],
    },
    {
      name: "user",
      desc: "stores user data",
      cols: ["Field", "Type", "Description"],
      rows: [
        ["id", "BigInt (PK)", "Unique identifier"],
        ["first_name", "VARCHAR", "first name of the user"],
        ["last_name", "VARCHAR", "last name of the user"],
      ],
    },
  ],
  steps: [
    {
      title: "Clone the repository",
      body: "Pull the project from version control to your local machine.",
    },
    {
      title: "Set up the backend",
      body: "Install Python dependencies, configure your PostgreSQL connection, and apply migrations.",
    },
    {
      title: "Set up the frontend",
      body: "Install Node packages and configure the Next.js environment to point at your local backend.",
    },
    {
      title: "Generate synthetic data",
      body: "Run the data generator module to populate flights and bookings for a realistic starting dataset.",
    },
    {
      title: "Start the backend server",
      body: "Launch the Django development server.",
    },
    {
      title: "Start the frontend",
      body: "Run the Next.js dev server and open the app in your browser. Search flights, book seats, and view your trips.",
    },
  ],
  roadmap: [
    "Authentication and user login system",
    "Real-time seat availability updates",
    "Production-grade AI price prediction model",
    "Booking cancellation and refund flows",
    "Payment integration",
    "Admin dashboard for airline analytics",
  ],
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-blue-600 font-medium whitespace-nowrap">
      {children}
    </span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const SectionTitle = ({ children }) => (
  <h2
    className="text-3xl font-serif text-gray-900 leading-tight mb-4"
    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
  >
    {children}
  </h2>
);

const Divider = () => <hr className="border-t border-gray-200 my-0" />;

export default function FlightPricingDoc() {
  const [activeTable, setActiveTable] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'Instrument Sans', sans-serif; }
        .font-serif-display { font-family: 'DM Serif Display', Georgia, serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }
        .grid-bg {
          background-image:
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.04) 79px, rgba(255,255,255,0.04) 80px),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.04) 79px, rgba(255,255,255,0.04) 80px);
        }
      `}</style>

      <div
        className="bg-white min-h-screen"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        {/* COVER */}
        <div className="bg-gray-950 text-white px-16 pt-20 pb-16 relative overflow-hidden grid-bg">
          <p className="font-mono-dm text-[11px] tracking-[0.18em] uppercase text-white/40 mb-10">
            Technical Overview&nbsp;&nbsp;/&nbsp;&nbsp;v1.0
          </p>
          <h1 className="font-serif-display text-6xl font-normal leading-[1.08] tracking-tight text-white max-w-2xl mb-8">
            Intelligent
            <br />
            <em
              className="text-white/50 not-italic"
              style={{ fontStyle: "italic" }}
            >
              Flight Pricing
            </em>
            <br />
            System
          </h1>
          <p className="text-[15px] font-light text-white/60 max-w-xl leading-relaxed mb-14">
            A full-stack application simulating airline ticket booking with
            dynamic pricing — combining Django REST APIs, PostgreSQL, React, and
            machine learning-based price prediction.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Django REST Framework",
              "PostgreSQL",
              "React / Next.js",
              "Scikit-learn",
              "Tailwind CSS",
            ].map((t) => (
              <span
                key={t}
                className="font-mono-dm text-[11px] tracking-[0.06em] px-3 py-1.5 border border-white/15 text-white/50 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-16">
          {/* ARCHITECTURE */}
          <section className="pt-16 pb-0">
            <SectionLabel>System Architecture</SectionLabel>
            <SectionTitle>Four-layer stack</SectionTitle>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-2xl mb-8">
              The system is composed of a presentation layer, a REST API layer,
              a persistence layer, and a machine learning pricing engine — each
              independently scalable.
            </p>
            <div className="border border-gray-200 rounded overflow-hidden">
              {data.archLayers.map((layer, i) => (
                <div
                  key={i}
                  className={`flex items-center border-b border-gray-200 last:border-b-0`}
                >
                  <div
                    className={`font-mono-dm text-[11px] font-medium px-5 py-4 min-w-13 text-center border-r border-gray-200 ${layer.color}`}
                  >
                    {layer.num}
                  </div>
                  <div className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">
                      {layer.name}
                    </div>
                    <div className="font-mono-dm text-[11px] text-gray-400">
                      {layer.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* FEATURES */}
          <section className="pt-16">
            <SectionLabel>Core Features</SectionLabel>
            <SectionTitle>What the system does</SectionTitle>
            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded overflow-hidden mt-2">
              {data.features.map((f, i) => (
                <div
                  key={i}
                  className={`bg-white p-7 ${f.span ? "col-span-2" : ""}`}
                >
                  <div className="font-mono-dm text-[11px] text-blue-600 mb-3">
                    {f.num}
                  </div>
                  <div className="text-[15px] font-semibold text-gray-900 tracking-tight mb-2">
                    {f.title}
                  </div>
                  <div className="text-[13.5px] text-gray-400 leading-relaxed">
                    {f.body}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* TECH STACK */}
          <section className="pt-16">
            <SectionLabel>Tech Stack</SectionLabel>
            <SectionTitle>Technologies used</SectionTitle>
            <div>
              {data.stack.map((row, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-6 py-4 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-mono-dm text-[11px] tracking-widest uppercase text-gray-400 min-w-25">
                    {row.cat}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {row.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-dm text-[12px] bg-gray-50 text-gray-600 px-3 py-1 rounded-sm border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* DATABASE */}
          <section className="pt-16">
            <SectionLabel>Database Structure</SectionLabel>
            <SectionTitle>Schema overview</SectionTitle>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-2xl mb-8">
              Four core tables underpin the system. The schema tracks city and
              flight data, individual bookings, and a full price history log.
            </p>

            {/* Table tabs */}
            <div className="flex gap-1 mb-0 border-b border-gray-200">
              {data.tables.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTable(i)}
                  className={`font-mono-dm text-[11px] tracking-[0.06em] px-4 py-2.5 border-b-2 transition-all ${
                    activeTable === i
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {data.tables.map((t, i) =>
              activeTable === i ? (
                <div
                  key={i}
                  className="border border-t-0 border-gray-200 rounded-b overflow-hidden"
                >
                  <div className="bg-gray-950 text-white px-5 py-3 flex items-center gap-3">
                    <span className="font-mono-dm text-[13px] font-medium tracking-[0.04em]">
                      {t.name}
                    </span>
                    <span className="text-xs text-white/40">{t.desc}</span>
                  </div>
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {t.cols.map((c) => (
                          <th
                            key={c}
                            className="font-mono-dm text-[10px] font-medium tracking-[0.12em] uppercase text-gray-400 text-left px-5 py-2.5"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60 transition-colors"
                        >
                          <td className="font-mono-dm text-[12px] font-medium text-blue-600 px-5 py-2.5 whitespace-nowrap">
                            {row[0]}
                          </td>
                          <td className="font-mono-dm text-[11px] text-gray-400 px-5 py-2.5 whitespace-nowrap">
                            {row[1]}
                          </td>
                          <td className="text-gray-500 px-5 py-2.5 leading-snug">
                            {row[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null,
            )}
          </section>

          <Divider />

          {/* FILE TREE */}
          <section className="pt-16">
            <SectionLabel>Project Structure</SectionLabel>
            <SectionTitle>Repository layout</SectionTitle>
            <div className="bg-gray-950 rounded overflow-hidden mt-6">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <pre className="font-mono-dm text-[12.5px] leading-[1.9] text-white/50 px-7 py-6 overflow-x-auto">
                {[
                  [true, "Intelligent-flight-pricing/"],
                  [false, "├── ", true, "Backend/"],
                  [false, "│   ├── ", true, "apps/"],
                  [false, "│   │   └── ", true, "flights/"],
                  [false, "│   │       └── ", true, "migrations/"],
                  [false, "│   ├── ", true, "config/"],
                  [false, "│   └── ", true, "ml/"],
                  [false, "│"],
                  [false, "└── ", true, "frontend/"],
                  [false, "    ├── ", true, "public/"],
                  [false, "    ├── ", true, "src/"],
                  [false, "    │   ├── ", true, "app/"],
                  [false, "    │   │   ├── ", true, "booking/[id]/"],
                  [false, "    │   │   ├── ", true, "flights/[id]/"],
                  [false, "    │   │   └── ", true, "trips/"],
                  [false, "    │   ├── ", true, "components/"],
                  [false, "    │   ├── ", true, "data/"],
                  [false, "    │   └── ", true, "services/"],
                  [false, "    ├── ", false, "package.json"],
                  [false, "    └── ", false, "next.config.js"],
                ].map((parts, i) => {
                  if (parts[0] === true) {
                    return (
                      <span key={i}>
                        <span className="text-white/85 font-medium">
                          {parts[1]}
                        </span>
                        {"\n"}
                      </span>
                    );
                  }
                  if (parts.length === 2) {
                    return (
                      <span key={i}>
                        {parts[1]}
                        {"\n"}
                      </span>
                    );
                  }
                  const isDir = parts[2];
                  return (
                    <span key={i}>
                      {parts[1]}
                      <span
                        className={
                          isDir ? "text-white/85 font-medium" : "text-white/40"
                        }
                      >
                        {parts[3]}
                      </span>
                      {"\n"}
                    </span>
                  );
                })}
              </pre>
            </div>
          </section>

          <Divider />

          {/* QUICK START */}
          <section className="pt-16">
            <SectionLabel>Quick Start</SectionLabel>
            <SectionTitle>Getting up and running</SectionTitle>
            <div>
              {data.steps.map((s, i) => (
                <div
                  key={i}
                  className="flex gap-5 py-5 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-mono-dm text-[11px] text-blue-600 min-w-6 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">
                      {s.title}
                    </div>
                    <div className="text-[13.5px] text-gray-500 leading-relaxed">
                      {s.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ROADMAP */}
          <section className="pt-16 pb-24">
            <SectionLabel>Future Improvements</SectionLabel>
            <SectionTitle>Planned work</SectionTitle>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-2xl mb-8">
              The following capabilities are scoped for future development
              iterations.
            </p>
            <div className="border border-gray-200 rounded overflow-hidden">
              {data.roadmap.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  <span className="text-[14px] text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
