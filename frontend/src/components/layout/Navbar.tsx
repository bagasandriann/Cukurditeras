import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.png";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Booking", href: "#booking" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Lokasi", href: "#lokasi" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#home"
          className="items-center gap-3 leading-none"
          aria-label="Cukur di Teras"
        >
          <Image
            src={Logo}
            alt=""
            width={135}
            priority
          />
        </Link>

        <div className="hidden items-center gap-10 text-sm font-semibold text-zinc-800 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-orange-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 text-zinc-950 md:hidden"
          type="button"
          aria-label="Buka menu navigasi"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </nav>
    </header>
  );
}
