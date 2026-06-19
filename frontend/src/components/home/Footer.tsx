import Image from "next/image";
import Logo from "@/assets/Logo.png";

const footerItems = [
  {
    title: "Lokasi",
    lines: ["Jl. Teras Indah No. 10", "Bandung, Jawa Barat"],
  },
  {
    title: "Jam Buka",
    lines: ["Setiap Hari", "09.00 - 21.00"],
  },
  {
    title: "Kontak",
    lines: ["0812 3456 7890", "@cukurditeras"],
  },
];

export function Footer() {
  return (
    <footer id="lokasi" className="border-t border-zinc-200 bg-white px-4 py-8 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={Logo}
              alt=""
              width={150}
            />
            <div className="leading-none">
            </div>
          </div>
        </div>

        {footerItems.map((item) => (
          <div key={item.title}>
            <h3 className="font-black text-zinc-950">{item.title}</h3>
            <div className="mt-3 space-y-1 text-sm leading-6 text-zinc-600">
              {item.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 w-full max-w-6xl border-t border-zinc-200 pt-5 text-center text-xs text-zinc-500">
        © 2026 Cukur di Teras. All rights reserved.
      </p>
    </footer>
  );
}
