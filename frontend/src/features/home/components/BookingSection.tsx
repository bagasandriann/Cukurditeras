const weekDays = [
  { day: "Sen", date: "16", month: "Jun" },
  { day: "Sel", date: "17", month: "Jun" },
  { day: "Rab", date: "18", month: "Jun" },
  { day: "Kam", date: "19", month: "Jun", active: true },
  { day: "Jum", date: "20", month: "Jun" },
  { day: "Sab", date: "21", month: "Jun" },
  { day: "Min", date: "22", month: "Jun" },
];

const slots = [
  { time: "17:00", status: "empty" },
  { time: "18:00", status: "available" },
  { time: "19:00", status: "available" },
  { time: "20:00", status: "available" },
  { time: "21:30", status: "empty" },
  { time: "22:00", status: "booked" },
  { time: "23:30", status: "booked" },
  { time: "24:00", status: "empty" },
];

const slotClasses = {
  available: "bg-orange-600 text-white hover:bg-orange-700",
  booked: "bg-orange-700 text-white",
  empty: "bg-zinc-950 text-white",
};

const legends = [
  { label: "Available", className: "bg-orange-600" },
  { label: "Belum disetting", className: "bg-zinc-950" },
  { label: "Sudah dibooking", className: "bg-orange-700" },
];

export function BookingSection() {
  return (
    <section id="booking" className="bg-white px-4 py-6 sm:px-8 lg:py-10">
      <div className="mx-auto grid w-full max-w-6xl min-w-0 gap-6 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_20px_70px_rgba(24,24,27,0.06)] sm:rounded-2xl sm:p-5 lg:grid-cols-[1.25fr_0.85fr] lg:gap-8 lg:p-7">
        <div className="min-w-0">
          <h2 className="text-xl font-black tracking-normal text-zinc-950 sm:text-2xl">
            Jadwal Minggu Ini
          </h2>

          <div className="mt-4 flex min-w-0 items-center gap-2 border-b border-zinc-200 pb-4 sm:mt-5 sm:gap-3">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-zinc-700 hover:bg-zinc-100 sm:h-10 sm:w-10 sm:text-2xl"
              aria-label="Minggu sebelumnya"
            >
              {"<"}
            </button>

            <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto sm:gap-2">
              {weekDays.map((item) => (
                <button
                  key={`${item.day}-${item.date}`}
                  type="button"
                  className={[
                    "flex min-w-12 flex-col items-center rounded-lg border px-2 py-2 text-center transition-colors sm:min-w-16 sm:rounded-xl sm:px-3",
                    item.active
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-transparent bg-white text-zinc-950 hover:border-orange-200 hover:bg-orange-50",
                  ].join(" ")}
                >
                  <span className="text-[10px] font-semibold sm:text-xs">
                    {item.day}
                  </span>
                  <span className="text-base font-black leading-none sm:text-lg">
                    {item.date}
                  </span>
                  <span className="text-[10px] sm:text-xs">{item.month}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-zinc-700 hover:bg-zinc-100 sm:h-10 sm:w-10 sm:text-2xl"
              aria-label="Minggu berikutnya"
            >
              {">"}
            </button>
          </div>

          <p className="mt-4 text-xs font-bold text-zinc-900 sm:text-sm">
            Kamis, 19 Juni 2026
          </p>

          <div className="mt-4 grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-2 sm:grid-cols-5 sm:gap-3">
            {slots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                className={[
                  "min-h-10 min-w-0 rounded-lg px-2 text-xs font-black shadow-sm transition-transform hover:-translate-y-0.5 sm:min-h-11 sm:px-3 sm:text-sm",
                  slotClasses[slot.status as keyof typeof slotClasses],
                ].join(" ")}
              >
                {slot.time}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-zinc-700 sm:mt-5 sm:gap-x-6 sm:text-xs">
            {legends.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <span
                  className={`h-2.5 w-4 rounded-sm sm:h-3 sm:w-5 ${item.className}`}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <form className="min-w-0 border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="text-xl font-black tracking-normal text-zinc-950 sm:text-2xl">
            Data Pemesan
          </h2>

          <label className="mt-5 block">
            <span className="text-xs font-bold text-zinc-950 sm:text-sm">
              Nama
            </span>
            <input
              className="mt-2 box-border h-11 w-full min-w-0 rounded-lg border border-zinc-300 px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-600 sm:h-12"
              placeholder="Masukkan nama lengkap"
              type="text"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-bold text-zinc-950 sm:text-sm">
              Nomor Telepon
            </span>
            <input
              className="mt-2 box-border h-11 w-full min-w-0 rounded-lg border border-zinc-300 px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-600 sm:h-12"
              placeholder="Contoh: 0812 3456 7890"
              type="tel"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-xs font-bold text-zinc-950 sm:text-sm">
              Catatan <span className="font-medium">(opsional)</span>
            </span>
            <textarea
              className="mt-2 box-border min-h-20 w-full min-w-0 resize-none rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-600 sm:min-h-24"
              placeholder="Contoh: Gaya rambut, dll"
            />
          </label>

          <button
            className="mt-5 inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-lg bg-orange-600 px-6 text-sm font-black text-white shadow-sm transition-colors hover:bg-orange-700 sm:min-h-12 sm:text-base"
            type="button"
          >
            Booking Jadwal
          </button>
        </form>
      </div>
    </section>
  );
}
