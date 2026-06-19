const testimonials = [
  {
    name: "Rizky Pratama",
    text: "Booking gampang, datang langsung sesuai jadwal. Tidak perlu antre lama.",
    initials: "RP",
  },
  {
    name: "Dimas A.",
    text: "Tempat nyaman, hasil cukuran rapi, capster ramah. Recommended!",
    initials: "DA",
  },
  {
    name: "Fajar Nugroho",
    text: "Sistem booking-nya membantu banget. Hemat waktu dan anti nunggu.",
    initials: "FN",
  },
];

export function TestimonialSection() {
  return (
    <section id="testimoni" className="bg-white px-4 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl">
          Testimoni
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_16px_50px_rgba(24,24,27,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
                  {item.initials}
                </div>
                <div>
                  <h3 className="font-black text-zinc-950">{item.name}</h3>
                  <p className="mt-1 text-sm font-black text-orange-500">
                    ★★★★★
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-700">
                <span className="mr-2 text-3xl font-black leading-none text-orange-600">
                  “
                </span>
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
