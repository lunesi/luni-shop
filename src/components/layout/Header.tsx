import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../context/CardContext";

const NAV_LINKS = [
  { to: "/catalog", cat: null, label: "Каталог" },
  { to: "/catalog?cat=mice", cat: "mice", label: "Мыши" },
  { to: "/catalog?cat=pads", cat: "pads", label: "Коврики" },
  { to: "/catalog?cat=parts", cat: "parts", label: "Глайды" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentCat = searchParams.get("cat");

  const { totalCount } = useCart();

  const isActive = (cat: string | null) => pathname === "/catalog" && cat === currentCat;

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between gap-6 px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-extrabold"
          onClick={() => setIsMenuOpen(false)}
        >
          Luni
          <i
            aria-hidden
            className="size-2 rounded-full bg-violet shadow-[0_0_12px_var(--color-violet)]"
          />
        </Link>

        <nav className="hidden gap-10 md:flex" aria-label="Основное меню">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              aria-current={isActive(link.cat) ? "page" : undefined}
              className={`text-[15px] transition-colors hover:text-text ${
                isActive(link.cat) ? "text-text" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-[42px] items-center gap-2 rounded-chip border border-line px-4 text-sm transition-colors hover:border-line-strong hover:bg-surface"
          >
            <ShoppingCart size={18} strokeWidth={1.5} aria-hidden />
            <span className="hidden sm:inline">Корзина</span>
            <b className="grid size-5 place-items-center rounded-chip bg-violet font-mono text-[11px] font-normal text-white">
              {totalCount}
            </b>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            className="grid size-[42px] place-items-center rounded-chip border border-line md:hidden"
          >
            {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className="border-t border-line bg-surface px-4 py-4 md:hidden"
          aria-label="Мобильное меню"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(link.cat) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-[15px] transition-colors hover:bg-surface-2 hover:text-text ${
                    isActive(link.cat) ? "text-text" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
