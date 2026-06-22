import Image from "next/image";
import Link from "next/link";
import Logo from "@/shared/assets/Logo.png";

export default function LoginCapsterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-zinc-950">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_70px_rgba(24,24,27,0.06)]">
        <div className="item-center mb-6 flex justify-center">
          <Link href="/" className="inline-flex" aria-label="Kembali ke Home">
            <Image src={Logo} alt="Cukur di Teras" width={150} priority />
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-normal text-orange-600">
            Area Capster
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-normal text-zinc-950">
            Login Capster
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Masuk untuk mengelola jadwal dan booking pelanggan.
          </p>
        </div>

        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-zinc-950">Username</span>
            <input
              className="mt-2 h-12 w-full rounded-lg border border-zinc-300 px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-600"
              placeholder="Masukkan username"
              type="text"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-zinc-950">Password</span>
            <input
              className="mt-2 h-12 w-full rounded-lg border border-zinc-300 px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-orange-600"
              placeholder="Masukkan password"
              type="password"
            />
          </label>

          <button
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-orange-600 px-6 text-base font-black text-white shadow-sm transition-colors hover:bg-orange-700"
            type="button"
          >
            Masuk
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 inline-flex w-full justify-center text-sm font-bold text-zinc-700 transition-colors hover:text-orange-600"
        >
          Kembali ke Home
        </Link>
      </section>
    </main>
  );
}
