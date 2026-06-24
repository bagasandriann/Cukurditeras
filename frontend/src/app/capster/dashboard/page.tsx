"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/shared/assets/Logo.png";
import { useEffect, useMemo, useState } from "react";

type SlotStatus = "AVAILABLE" | "BOOKED" | "CLOSED";

type Slot = {
  id: string;
  status: SlotStatus;
  date: string;
  startTime: string;
  endTime: string;
  capsterName: string;
  notes: string | null;
};

const dayNames = [
  { short: "Sen", full: "Senin" },
  { short: "Sel", full: "Selasa" },
  { short: "Rab", full: "Rabu" },
  { short: "Kam", full: "Kamis" },
  { short: "Jum", full: "Jumat" },
  { short: "Sab", full: "Sabtu" },
  { short: "Min", full: "Minggu" },
];

const hours = Array.from(
  { length: 24 },
  (_, index) => `${String(index).padStart(2, "0")}:00`,
);

const bookings = [
  {
    time: "09:00",
    name: "Rafi Pratama",
    phone: "0812 4456 7788",
    code: "CDT4K91",
  },
  {
    time: "10:00",
    name: "Dimas Akbar",
    phone: "0857 9012 3344",
    code: "CDT8P20",
  },
  {
    time: "13:00",
    name: "Bima Satrio",
    phone: "0896 1100 4433",
    code: "CDT7M16",
  },
  {
    time: "16:00",
    name: "Arga Mahendra",
    phone: "0821 7780 1145",
    code: "CDT2N84",
  },
];

const legends = [
  { label: "Available", className: "bg-orange-500" },
  { label: "Booked", className: "bg-zinc-950" },
  { label: "Closed", className: "bg-zinc-200" },
];

// Keep date formatting in local time so the API range does not shift because of UTC conversion.
function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Dashboard weeks start on Monday. JavaScript uses 0 for Sunday, so Sunday moves back 6 days.
function getStartOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);

  return result;
}

// Build the rows shown in the schedule grid and attach the API date for each day.
function buildWeekDays(startDate: Date) {
  return dayNames.map((day, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      ...day,
      date: formatLocalDate(date),
    };
  });
}

// Human-readable label for the currently loaded weekly range.
function formatRangeLabel(startDate: Date, endDate: Date) {
  const monthFormatter = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  });

  return `${startDate.getDate()} - ${endDate.getDate()} ${monthFormatter.format(endDate)}`;
}

// Match one grid cell to a backend slot. Missing slot data means that hour is closed.
function getSlotStatus(slots: Slot[], date: string, hour: number) {
  const hourText = `${String(hour).padStart(2, "0")}:00:00`;

  const slot = slots.find(
    (item) => item.date === date && item.startTime === hourText,
  );

  if (!slot) {
    return "closed";
  }

  if (slot.status === "BOOKED") {
    return "booked";
  }

  if (slot.status === "AVAILABLE") {
    return "available";
  }

  return "closed";
}

function getSlotClass(status: string) {
  if (status === "booked") {
    return "border-zinc-950 bg-zinc-950 text-white";
  }

  if (status === "available") {
    return "border-orange-500 bg-orange-500 text-white hover:bg-orange-600";
  }

  return "border-zinc-200 bg-zinc-100 text-zinc-400 hover:bg-zinc-200";
}

function PlusIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

async function handleLogout() {
  try {
    const response = await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      globalThis.location.href = "/login-capster";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error occurred while logging out:", error);
  }
}

function CapsterNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:h-24 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Cukur di Teras"
        >
          <Image src={Logo} alt="Cukur di Teras" width={135} priority />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-orange-600 px-5 text-sm font-black text-white shadow-sm transition-colors hover:bg-orange-700"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default function CapsterDashboardPage() {
  const [slots, setSlots] = useState<Slot[]>([]);

  // The week range is calculated once when the dashboard opens.
  const weekStartDate = useMemo(() => getStartOfWeek(new Date()), []);
  const weekEndDate = useMemo(() => {
    const endDate = new Date(weekStartDate);
    endDate.setDate(weekStartDate.getDate() + 6);

    return endDate;
  }, [weekStartDate]);
  const weekDays = useMemo(() => buildWeekDays(weekStartDate), [weekStartDate]);
  const weekStart = formatLocalDate(weekStartDate);
  const weekEnd = formatLocalDate(weekEndDate);
  const weekRangeLabel = formatRangeLabel(weekStartDate, weekEndDate);

  useEffect(() => {
    async function fetchSlots() {
      // credentials: "include" sends the HttpOnly auth cookie created during capster login.
      const response = await fetch(
        `http://localhost:8080/api/admin/slots/week?startDate=${weekStart}&endDate=${weekEnd}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.error("Gagal mengambil data slot");
        return;
      }

      const data = await response.json();
      setSlots(data);
    }

    fetchSlots();
  }, [weekEnd, weekStart]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <CapsterNavbar />

      <main className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8 sm:py-8">
        <section className="flex flex-col gap-4 border-b border-zinc-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-orange-600">
              Area Capster
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl">
              Dashboard Capster
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Tempat untuk mengelola jadwal dan melihat booking pelanggan.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-600">
              <div className="mr-2 flex items-center justify-center">
                <CalendarIcon />
              </div>
              {weekRangeLabel}
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-black text-white shadow-sm transition-colors hover:bg-orange-700"
            >
              <PlusIcon />
              Simpan Jadwal
            </button>
          </div>
        </section>

        <section className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h2 className="text-lg font-black tracking-normal text-zinc-950">
                  Template Jadwal Mingguan
                </h2>
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  Pilih blok jam yang ingin dibuka. Setiap blok otomatis
                  berdurasi 1 jam.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-bold text-zinc-600">
                {legends.map((legend) => (
                  <span
                    key={legend.label}
                    className="inline-flex items-center gap-2"
                  >
                    <span
                      className={`h-3 w-3 rounded-sm ${legend.className}`}
                    />
                    {legend.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto p-4 sm:p-5">
              <div className="min-w-[1120px]">
                <div className="grid grid-cols-[72px_repeat(24,minmax(38px,1fr))] gap-1">
                  <div className="h-9" />
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="flex h-9 items-center justify-center rounded-lg bg-zinc-50 text-[11px] font-black text-zinc-500"
                    >
                      {hour}
                    </div>
                  ))}

                  {weekDays.map((day) => (
                    <div key={day.short} className="contents">
                      <div className="flex h-11 items-center rounded-lg bg-zinc-50 px-3 text-sm font-black text-zinc-800">
                        <span className="sm:hidden">{day.short}</span>
                        <span className="hidden sm:inline">{day.full}</span>
                      </div>

                      {hours.map((hourLabel, hour) => {
                        const status = getSlotStatus(slots, day.date, hour);

                        return (
                          <button
                            key={`${day.short}-${hourLabel}`}
                            type="button"
                            className={[
                              "flex h-11 items-center justify-center rounded-lg border text-[10px] font-black transition-colors",
                              getSlotClass(status),
                            ].join(" ")}
                            aria-label={`${day.full} ${hourLabel} ${status}`}
                            title={`${day.full} ${hourLabel} ${status}`}
                          >
                            {status === "booked"
                              ? "B"
                              : status === "available"
                                ? "A"
                                : ""}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex w-full min-w-0 max-w-full flex-col rounded-lg border border-zinc-200 bg-white shadow-sm lg:max-h-[550px] lg:overflow-hidden">
            <div className="shrink-0 border-b border-zinc-200 p-4 sm:p-5">
              <h2 className="text-lg font-black tracking-normal text-zinc-950">
                Jadwal Booking
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Booking aktif pelanggan.
              </p>

              <div className="mt-4 grid grid-cols-2 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
                <button
                  type="button"
                  className="min-h-9 rounded-lg bg-zinc-950 px-3 text-xs font-black text-white"
                >
                  Hari Ini
                </button>
                <button
                  type="button"
                  className="min-h-9 rounded-lg px-3 text-xs font-black text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950"
                >
                  Minggu Ini
                </button>
              </div>
            </div>

            <div className="divide-y divide-zinc-200 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
              {bookings.map((booking) => (
                <article
                  key={booking.code}
                  className="p-4 transition-colors hover:bg-zinc-50 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-black leading-none text-orange-600">
                        {booking.time}
                      </p>
                      <h3 className="mt-3 truncate text-base font-black text-zinc-950">
                        {booking.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-600">
                        {booking.phone}
                      </p>
                    </div>
                    <span className="rounded-lg bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-3 py-2">
                    <span className="text-xs font-bold text-zinc-500">
                      Kode Booking
                    </span>
                    <span className="text-sm font-black text-zinc-950">
                      {booking.code}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
