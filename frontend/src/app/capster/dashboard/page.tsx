import Image from "next/image";
import Link from "next/link";
import Logo from "@/shared/assets/Logo.png";

const days = [
  { short: "Sen", full: "Senin" },
  { short: "Sel", full: "Selasa" },
  { short: "Rab", full: "Rabu" },
  { short: "Kam", full: "Kamis" },
  { short: "Jum", full: "Jumat" },
  { short: "Sab", full: "Sabtu" },
  { short: "Min", full: "Minggu" },
];

const hours = Array.from({ length: 24 }, (_, index) =>
  `${String(index).padStart(2, "0")}:00`,
);

const availableSlots: Record<string, number[]> = {
  Sen: [9, 10, 11, 13, 14, 16, 19],
  Sel: [9, 10, 11, 13, 14, 15, 16],
  Rab: [10, 11, 13, 14, 15],
  Kam: [9, 10, 11, 12, 14, 15, 16, 19],
  Jum: [9, 10, 13, 14, 16, 17, 19],
  Sab: [8, 9, 10, 11, 13, 14],
  Min: [9, 10, 11],
};

const bookedSlots: Record<string, number[]> = {
  Sen: [9, 13],
  Sel: [10],
  Kam: [19],
  Jum: [14],
  Sab: [9],
};

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

function getSlotStatus(day: string, hour: number) {
  if (bookedSlots[day]?.includes(hour)) {
    return "booked";
  }

  if (availableSlots[day]?.includes(hour)) {
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

function CapsterNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:h-24 sm:px-8">
        <Link href="/" className="inline-flex items-center" aria-label="Cukur di Teras">
          <Image src={Logo} alt="Cukur di Teras" width={135} priority />
        </Link>

        <Link
          href="/login-capster"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-orange-600 px-5 text-sm font-black text-white shadow-sm transition-colors hover:bg-orange-700"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}

export default function CapsterDashboardPage() {
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
              Kelola template jadwal mingguan dengan slot tetap 1 jam, lalu pantau booking yang masuk.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm font-black text-zinc-800 transition-colors hover:border-orange-300 hover:text-orange-700"
            >
              <CalendarIcon />
              Minggu Ini
            </button>
            <div className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-600">
              22 - 28 Juni 2026
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
                  Pilih blok jam yang ingin dibuka. Setiap blok otomatis berdurasi 1 jam.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-bold text-zinc-600">
                {legends.map((legend) => (
                  <span key={legend.label} className="inline-flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-sm ${legend.className}`} />
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

                  {days.map((day) => (
                    <div key={day.short} className="contents">
                      <div className="flex h-11 items-center rounded-lg bg-zinc-50 px-3 text-sm font-black text-zinc-800">
                        <span className="sm:hidden">{day.short}</span>
                        <span className="hidden sm:inline">{day.full}</span>
                      </div>

                      {hours.map((hourLabel, hour) => {
                        const status = getSlotStatus(day.short, hour);

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
                            {status === "booked" ? "B" : status === "available" ? "A" : ""}
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
                Booking aktif dari pelanggan tanpa login.
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
                <article key={booking.code} className="p-4 transition-colors hover:bg-zinc-50 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-black leading-none text-orange-600">
                        {booking.time}
                      </p>
                      <h3 className="mt-3 truncate text-base font-black text-zinc-950">
                        {booking.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-600">{booking.phone}</p>
                    </div>
                    <span className="rounded-lg bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                      CONFIRMED
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-3 py-2">
                    <span className="text-xs font-bold text-zinc-500">Kode Booking</span>
                    <span className="text-sm font-black text-zinc-950">{booking.code}</span>
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
