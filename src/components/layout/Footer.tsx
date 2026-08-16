import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Каталог",
    links: [
      { to: "/catalog?cat=mice", label: "Мыши" },
      { to: "/catalog?cat=pads", label: "Коврики" },
      { to: "/catalog?cat=parts", label: "Глайды" },
    ],
  },
  {
    title: "Помощь",
    links: [
      { to: "/delivery", label: "Доставка" },
      { to: "/return", label: "Возврат 14 дней" },
      { to: "/warranty", label: "Гарантия" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              className="flex w-fit items-center gap-2 font-display text-xl font-extrabold"
            >
              Luni
              <i aria-hidden className="size-2 rounded-full bg-violet" />
            </Link>
            <p className="mt-4 max-w-[32ch] text-[15px] text-muted">Магазин игровой периферии.</p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-violet">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[15px] text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-line pt-6 font-mono text-[11px] tracking-wider text-muted sm:flex-row">
          <span>© 2026 Luni</span>
          <span>Ежедневно 10:00–22:00</span>
        </div>
      </div>
    </footer>
  );
}
