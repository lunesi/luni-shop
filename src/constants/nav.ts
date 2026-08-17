import type { Category } from "../types/product";

export type NavLink = {
  to: string;
  cat: Category | null;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { to: "/catalog", cat: null, label: "Каталог" },
  { to: "/catalog?cat=mice", cat: "mice", label: "Мыши" },
  { to: "/catalog?cat=pads", cat: "pads", label: "Коврики" },
  { to: "/catalog?cat=parts", cat: "parts", label: "Глайды" },
];
