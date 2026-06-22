import Image from "next/image";
import Link from "next/link";
import heroImage from "@/shared/assets/hero-section-bg.png";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-zinc-200 bg-white"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-5 pt-5 sm:px-8 sm:pt-8 lg:grid-cols-[0.74fr_1.26fr] lg:gap-14 lg:py-0 lg:pt-0">
        <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-4 hidden rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-normal text-orange-700 lg:inline-flex">
            Cukur rapi, jadwal pasti
          </p>
          <h1 className="max-w-xl text-3xl font-black leading-[1.05] tracking-normal text-zinc-950 sm:text-5xl lg:text-6xl">
            Booking Cukur{" "}
            <span className="block text-orange-600">Tanpa Ribet</span>
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-5 text-zinc-600 sm:max-w-md sm:text-base sm:leading-7 lg:mt-4">
            Pilih jadwal, isi data, datang sesuai slot. Cukur santai di teras,
            tanpa antre lama.
          </p>
          <Link
            href="#booking"
            className="mt-4 inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-lg bg-orange-600 px-7 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-700 sm:mt-6 sm:min-h-12 sm:text-base lg:w-auto"
          >
            Booking Sekarang
          </Link>
        </div>

        <div className="relative -mx-5 mt-2 aspect-[16/7] min-h-36 overflow-hidden sm:-mx-8 sm:aspect-[16/9] sm:min-h-72 lg:mx-0 lg:mt-0 lg:aspect-[16/10] lg:min-h-[520px]">
          <Image
            src={heroImage}
            alt="Ilustrasi pelanggan sedang cukur rambut di teras rumah"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[72%_center] lg:object-center"
          />
        </div>
      </div>
    </section>
  );
}
